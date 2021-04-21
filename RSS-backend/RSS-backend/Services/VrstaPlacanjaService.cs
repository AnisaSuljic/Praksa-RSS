using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class VrstaPlacanjaService : BaseCRUDService<Faktura.Model.VrstaPlacanja, Database.VrstaPlacanja, object, Faktura.Model.Requests.VrstaPlacanjaInsertUpdate,
        Faktura.Model.Requests.VrstaPlacanjaInsertUpdate>, IVrstaPlacanjaService
    {
        public VrstaPlacanjaService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public List<Faktura.Model.VrstaPlacanja> Get(object search = null)
        {
            var set = Context.Set<Database.VrstaPlacanja>().AsQueryable();

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
            return _mapper.Map<List<Faktura.Model.VrstaPlacanja>>(list);
        }
        public override Faktura.Model.VrstaPlacanja Insert(Faktura.Model.Requests.VrstaPlacanjaInsertUpdate request)
        {
            var set = Context.Set<Database.VrstaPlacanja>();
            Database.VrstaPlacanja entity = _mapper.Map<Database.VrstaPlacanja>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.VrstaPlacanja>(entity);
        }
        public override Faktura.Model.VrstaPlacanja GetById(int id)
        {
            var set = Context.Set<Database.VrstaPlacanja>();
            var entity = set.Where(x => x.VrstaPlacanjaId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.VrstaPlacanja>(entity);
        }
        public override Faktura.Model.VrstaPlacanja Delete(int id)
        {
            var set = Context.Set<Database.VrstaPlacanja>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.VrstaPlacanja>(entity);
        }
    }
}
