using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class ProizvodjacService : BaseCRUDService<Faktura.Model.Proizvodjac,Database.Proizvodjac,object, Faktura.Model.Requests.ProizvodjacInsertUpdate,
        Faktura.Model.Requests.ProizvodjacInsertUpdate>, IProizvodjacService
    {
        public ProizvodjacService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }
        public List<Faktura.Model.Proizvodjac> Get(object search = null)
        {
            var set = Context.Set<Database.Proizvodjac>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Proizvodjac>>(list);
        }
        public override Faktura.Model.Proizvodjac Insert(Faktura.Model.Requests.ProizvodjacInsertUpdate request)
        {
            var set = Context.Set<Database.Proizvodjac>();
            Database.Proizvodjac entity = _mapper.Map<Database.Proizvodjac>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Proizvodjac>(entity);
        }
        public override Faktura.Model.Proizvodjac GetById(int id)
        {
            var set = Context.Set<Database.Proizvodjac>();
            var entity = set.Where(x => x.ProizvodjacId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Proizvodjac>(entity);
        }
        public override Faktura.Model.Proizvodjac Delete(int id)
        {
            var set = Context.Set<Database.Proizvodjac>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Proizvodjac>(entity);
        }
    }
}
