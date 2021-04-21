using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class GrupaService : BaseCRUDService<Faktura.Model.Grupa, Database.Grupa, object, Faktura.Model.Requests.GrupaInsertUpdate,
        Faktura.Model.Requests.GrupaInsertUpdate>, IGrupaService
    {
        public GrupaService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }
        public List<Faktura.Model.Grupa> Get(object search = null)
        {
            var set = Context.Set<Database.Grupa>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Grupa>>(list);
        }
        public override Faktura.Model.Grupa Insert(Faktura.Model.Requests.GrupaInsertUpdate request)
        {
            var set = Context.Set<Database.Grupa>();
            Database.Grupa entity = _mapper.Map<Database.Grupa>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Grupa>(entity);
        }
        public override Faktura.Model.Grupa GetById(int id)
        {
            var set = Context.Set<Database.Grupa>();
            var entity = set.Where(x => x.GrupaId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Grupa>(entity);
        }
        public override Faktura.Model.Grupa Delete(int id)
        {
            var set = Context.Set<Database.Grupa>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Grupa>(entity);
        }
    }
}
