using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class KupacService : BaseCRUDService<Faktura.Model.Kupac, Database.Kupac, object, Faktura.Model.Requests.KupacInsertUpdate,
        Faktura.Model.Requests.KupacInsertUpdate>, IKupacService
    {
        public KupacService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Kupac> Get(object search = null)
        {
            var set = Context.Set<Database.Kupac>().AsQueryable();

            //if (!string.IsNullOrWhiteSpace(search?.Ime))
            //{
            //    set = set.Where(x => x.Ime.ToLower().Contains(search.Ime.ToLower()) && x.Obrisan == false);
            //}
            //if (!string.IsNullOrWhiteSpace(search?.Prezime))
            //{
            //    set = set.Where(x => x.Prezime.ToLower().Contains(search.Prezime.ToLower()) && x.Obrisan == false);
            //}
            //if (!string.IsNullOrWhiteSpace(search?.KorisnickoIme))
            //{
            //    set = set.Where(x => x.KorisnickoIme.ToLower().Contains(search.KorisnickoIme.ToLower()) && x.Obrisan == false);
            //}

            var list = set.Where(x => x.Obrisan == false).ToList(); //samo ako nije obrisan da se prikazuje
            return _mapper.Map<List<Faktura.Model.Kupac>>(list);
        }
        public override Faktura.Model.Kupac Insert(Faktura.Model.Requests.KupacInsertUpdate request)
        {
            decimal pdv=0.17m;
            var set = Context.Set<Database.Kupac>();
            Database.Kupac entity = _mapper.Map<Database.Kupac>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Kupac>(entity);
        }
        public override Faktura.Model.Kupac GetById(int id)
        {
            var set = Context.Set<Database.Kupac>();
            var entity = set.Where(x => x.KupacId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Kupac>(entity);
        }
        public override Faktura.Model.Kupac Delete(int id)
        {
            var set = Context.Set<Database.Kupac>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Kupac>(entity);
        }
    }
}
