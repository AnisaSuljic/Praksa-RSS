using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class PorezService : BaseCRUDService<Faktura.Model.Porez, Database.Porez, object, Faktura.Model.Requests.PorezInsertUpdate,
        Faktura.Model.Requests.PorezInsertUpdate>, IPorezService
    {
        public PorezService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Porez> Get(object search = null)
        {
            var set = Context.Set<Database.Porez>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Porez>>(list);
        }
        public override Faktura.Model.Porez Insert(Faktura.Model.Requests.PorezInsertUpdate request)
        {
            var set = Context.Set<Database.Porez>();
            Database.Porez entity = _mapper.Map<Database.Porez>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Porez>(entity);
        }
        public override Faktura.Model.Porez GetById(int id)
        {
            var set = Context.Set<Database.Porez>();
            var entity = set.Where(x => x.PorezId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Porez>(entity);
        }
        public override Faktura.Model.Porez Delete(int id)
        {
            var set = Context.Set<Database.Porez>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Porez>(entity);
        }
    }
}
