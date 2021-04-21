using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class SkladisteService : BaseCRUDService<Faktura.Model.Skladiste, Database.Skladiste, object, Faktura.Model.Requests.SkladisteInsertUpdate,
        Faktura.Model.Requests.SkladisteInsertUpdate>, ISkladisteService
    {
        public SkladisteService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Skladiste> Get(object search = null)
        {
            var set = Context.Set<Database.Skladiste>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Skladiste>>(list);
        }
        public override Faktura.Model.Skladiste Insert(Faktura.Model.Requests.SkladisteInsertUpdate request)
        {
            var set = Context.Set<Database.Skladiste>();
            Database.Skladiste entity = _mapper.Map<Database.Skladiste>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Skladiste>(entity);
        }
        public override Faktura.Model.Skladiste GetById(int id)
        {
            var set = Context.Set<Database.Skladiste>();
            var entity = set.Where(x => x.SkladisteId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Skladiste>(entity);
        }
        public override Faktura.Model.Skladiste Delete(int id)
        {
            var set = Context.Set<Database.Skladiste>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Skladiste>(entity);
        }
    }
}
