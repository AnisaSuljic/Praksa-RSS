using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class GradService : BaseCRUDService<Faktura.Model.Grad, Database.Grad, object, Faktura.Model.Requests.GradInsertUpdate,
        Faktura.Model.Requests.GradInsertUpdate>, IGradService
    {
        public GradService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Grad> Get(object search = null)
        {
            var set = Context.Set<Database.Grad>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Grad>>(list);
        }
        public override Faktura.Model.Grad Insert(Faktura.Model.Requests.GradInsertUpdate request)
        {
            var set = Context.Set<Database.Grad>();
            Database.Grad entity = _mapper.Map<Database.Grad>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Grad>(entity);
        }
        public override Faktura.Model.Grad GetById(int id)
        {
            var set = Context.Set<Database.Grad>();
            var entity = set.Where(x => x.GradId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Grad>(entity);
        }
        public override Faktura.Model.Grad Delete(int id)
        {
            var set = Context.Set<Database.Grad>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Grad>(entity);
        }
    }
}
