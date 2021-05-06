using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RSS_backend.Database;
using RSS_backend.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class KorisnikService : BaseCRUDService<Faktura.Model.Korisnik, Database.Korisnik, Faktura.Model.Korisnik, Faktura.Model.Requests.KorisnikInsertUpdate,
                                    Faktura.Model.Requests.KorisnikInsertUpdate>, IKorisnikService
    {
        public KorisnikService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Korisnik> Get(Faktura.Model.KorisnikSearch search = null)
        {
            var set = Context.Set<Database.Korisnik>().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search?.Ime))
            {
                set = set.Where(x => x.Ime.ToLower().Contains(search.Ime.ToLower()) && x.Obrisan == false);
            }
            if (!string.IsNullOrWhiteSpace(search?.Prezime))
            {
                set = set.Where(x => x.Prezime.ToLower().Contains(search.Prezime.ToLower()) && x.Obrisan == false);
            }
            if (!string.IsNullOrWhiteSpace(search?.KorisnickoIme))
            {
                set = set.Where(x => x.KorisnickoIme.ToLower().Contains(search.KorisnickoIme.ToLower()) && x.Obrisan == false);
            }

            var list = set.Where(x => x.Obrisan == false).ToList(); //samo ako nije obrisan da se prikazuje
            return _mapper.Map<List<Faktura.Model.Korisnik>>(list);
        }
        
        public override Faktura.Model.Korisnik Insert(Faktura.Model.Requests.KorisnikInsertUpdate request)
        {
            var set = Context.Set<Database.Korisnik>();
            Database.Korisnik entity = _mapper.Map<Database.Korisnik>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            //var LozinkaSalt = GenerateSalt();
            //entity.Lozinka = GenerateHash(LozinkaSalt, request.Lozinka);

            //Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Korisnik>(entity);
        }
        public override Faktura.Model.Korisnik GetById(int id)
        {
            var set = Context.Set<Database.Korisnik>();
            var entity = set.Where(x => x.KorisnikId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Korisnik>(entity);
        }
        public override Faktura.Model.Korisnik Delete(int id)
        {
            var set = Context.Set<Database.Korisnik>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Korisnik>(entity);
        }

        //Login
        public async Task<Faktura.Model.Korisnik> Login(string username, string password)
        {
            var entity = await Context.Korisniks.FirstOrDefaultAsync(x => x.KorisnickoIme == username);

            if (entity == null)
                throw new UserException("Pogrešno korisničko ime ili lozinka");
            //var LozinkaSalt = GenerateSalt();
            //var hash = GenerateHash(LozinkaSalt, password);
            //
            //if (hash != entity.Lozinka)
            //    throw new UserException("Pogrešno korisničko ime ili lozinka");


            //ovaj dio nece trebati ako se skonta hash (komentarisan kod iznad)
            if (password != entity.Lozinka)
                throw new UserException("Pogrešno korisničko ime ili lozinka");

            return _mapper.Map<Faktura.Model.Korisnik>(entity);
        }

        //Lozinka hashiranje

        public static string GenerateSalt()
        {
            var buf = new byte[16];
            (new RNGCryptoServiceProvider()).GetBytes(buf);
            return Convert.ToBase64String(buf);
        }
        public static string GenerateHash(string salt, string password)
        {
            byte[] src = Convert.FromBase64String(salt);
            byte[] bytes = Encoding.Unicode.GetBytes(password);
            byte[] dst = new byte[src.Length + bytes.Length];

            System.Buffer.BlockCopy(src, 0, dst, 0, src.Length);
            System.Buffer.BlockCopy(bytes, 0, dst, src.Length, bytes.Length);

            HashAlgorithm algorithm = HashAlgorithm.Create("SHA1");
            byte[] inArray = algorithm.ComputeHash(dst);
            return Convert.ToBase64String(inArray);
        }

    }
}
