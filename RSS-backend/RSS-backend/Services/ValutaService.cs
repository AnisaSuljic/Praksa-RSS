using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class ValutaService : BaseCRUDService<Faktura.Model.Valuta, Database.Valutum, object, Faktura.Model.Requests.ValutaInsertUpdate,
        Faktura.Model.Requests.ValutaInsertUpdate>, IValutaService
    {
        public ValutaService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Valuta> Get(object search = null)
        {
            var set = Context.Set<Database.Valutum>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Valuta>>(list);
        }
        public override Faktura.Model.Valuta Insert(Faktura.Model.Requests.ValutaInsertUpdate request)
        {
            var set = Context.Set<Database.Valutum>();
            Database.Valutum entity = _mapper.Map<Database.Valutum>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Valuta>(entity);
        }
        public override Faktura.Model.Valuta GetById(int id)
        {
            var set = Context.Set<Database.Valutum>();
            var entity = set.Where(x => x.ValutaId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Valuta>(entity);
        }
        public override Faktura.Model.Valuta Delete(int id)
        {
            var set = Context.Set<Database.Valutum>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Valuta>(entity);
        }
    }
}
