using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class RacunService : BaseCRUDService<Faktura.Model.Racun, Database.Racun, object, Faktura.Model.Requests.RacunInsertUpdate,
        Faktura.Model.Requests.RacunInsertUpdate>, IRacunService
    {
        public RacunService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.Racun> Get(object search = null)
        {
            var set = Context.Set<Database.Racun>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.Racun>>(list);
        }

        public override Faktura.Model.Racun Insert(Faktura.Model.Requests.RacunInsertUpdate request)
        {
            var set = Context.Set<Database.Racun>();
            Database.Racun entity = _mapper.Map<Database.Racun>(request);

            //entity.BrojRacuna = "2021/br" + (Get().Count() + 1).ToString();
            entity.Datum = DateTime.Now;
            entity.Godina = DateTime.Now.Year;
            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Racun>(entity);
        }
        public override Faktura.Model.Racun Update(int id, Faktura.Model.Requests.RacunInsertUpdate request)
        {
            var set = Context.Set<Database.Racun>();
            var entity = set.Find(id);

            entity.Datum = DateTime.Now;
            _mapper.Map(request, entity);

            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Racun>(entity);
        }
        public override Faktura.Model.Racun GetById(int id)
        {
            var set = Context.Set<Database.Racun>();
            var entity = set.Where(x => x.RacunId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Racun>(entity);
        }
        public override Faktura.Model.Racun Delete(int id)
        {
            var set = Context.Set<Database.Racun>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Racun>(entity);
        }
    }
}
