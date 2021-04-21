using AutoMapper;
using Faktura.Model;
using Faktura.Model.Requests;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class VrstaService : BaseCRUDService<Faktura.Model.Vrsta, Database.Vrstum, object, Faktura.Model.Requests.VrstaInsertUpdate,
        Faktura.Model.Requests.VrstaInsertUpdate>, IVrstaService
    {
        public VrstaService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override List<Faktura.Model.Vrsta> Get(object search = null)
        {
            var set = Context.Set<Database.Vrstum>().AsQueryable();

            //if (!string.IsNullOrWhiteSpace(search?.Naziv))
            //{
            //    set = set.Where(x => x.Naziv.ToLower().Contains(search.Naziv.ToLower()) && x.Obrisan == false);
            //}

            var list = set.Where(x => x.Obrisan == false).ToList(); //samo ako nije obrisan da se prikazuje
            return _mapper.Map<List<Faktura.Model.Vrsta>>(list);
        }
        public override Faktura.Model.Vrsta Insert(Faktura.Model.Requests.VrstaInsertUpdate request)
        {
            var set = Context.Set<Database.Vrstum>();
            Database.Vrstum entity = _mapper.Map<Database.Vrstum>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.Vrsta>(entity);
        }
        public override Faktura.Model.Vrsta GetById(int id)
        {
            var set = Context.Set<Database.Vrstum>();
            var entity = set.Where(x => x.VrstaId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Vrsta>(entity);
        }
        public override Faktura.Model.Vrsta Delete(int id)
        {
            var set = Context.Set<Database.Vrstum>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Vrsta>(entity);
        }
    }
}
