using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class StavkeService : BaseCRUDService<Faktura.Model.Stavke, Database.Stavke, object, Faktura.Model.Requests.StavkeInsertUpdate,
        Faktura.Model.Requests.StavkeInsertUpdate>, IStavkeService
    {
        public StavkeService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Stavke> Get(object search = null)
        {
            var set = Context.Set<Database.Stavke>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Stavke>>(list);
        }
        public override Faktura.Model.Stavke Insert(Faktura.Model.Requests.StavkeInsertUpdate request)
        {
            var set = Context.Set<Database.Stavke>();
            Database.Stavke entity = _mapper.Map<Database.Stavke>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Stavke>(entity);
        }
        public override Faktura.Model.Stavke GetById(int id)
        {
            var set = Context.Set<Database.Stavke>();
            var entity = set.Where(x => x.StavkeId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Stavke>(entity);
        }
        public override Faktura.Model.Stavke Delete(int id)
        {
            var set = Context.Set<Database.Stavke>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Stavke>(entity);
        }
    }
}
