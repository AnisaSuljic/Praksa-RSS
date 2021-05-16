using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class ArtiklService : BaseCRUDService<Faktura.Model.Artikl, Database.Artikl, object, Faktura.Model.Requests.ArtiklInsertUpdate,
        Faktura.Model.Requests.ArtiklInsertUpdate>, IArtiklService
    {
        public ArtiklService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Artikl> Get(object search = null)
        {
            var set = Context.Set<Database.Artikl>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Artikl>>(list);
        }
        public override Faktura.Model.Artikl Insert(Faktura.Model.Requests.ArtiklInsertUpdate request)
        {
            decimal pdv=0.17m;
            var set = Context.Set<Database.Artikl>();
            Database.Artikl entity = _mapper.Map<Database.Artikl>(request);

            entity.Obrisan = false;
            //entity.Mpc =entity.Vpc+ Decimal.Multiply((decimal)entity.Vpc, pdv);

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Artikl>(entity);
        }
        public override Faktura.Model.Artikl GetById(int id)
        {
            var set = Context.Set<Database.Artikl>();
            var entity = set.Where(x => x.ArtiklId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Artikl>(entity);
        }
        public override Faktura.Model.Artikl Delete(int id)
        {
            var set = Context.Set<Database.Artikl>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Artikl>(entity);
        }
    }
}
