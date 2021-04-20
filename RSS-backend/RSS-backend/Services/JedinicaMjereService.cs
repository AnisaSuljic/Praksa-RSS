using AutoMapper;
using Faktura.Model.Requests;
using RSS_backend.Database;
using RSS_backend.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Faktura;

namespace RSS_backend.Services
{
    public class JedinicaMjereService : BaseCRUDService<Faktura.Model.JedinicaMjere, JedinicaMjere, Faktura.Model.JedinicaMjereSearch,
        Faktura.Model.Requests.JedinicaMjereInsert, Faktura.Model.Requests.JedinicaMjereUpdate>, IJedinicaMjereService
    {
   

        public JedinicaMjereService(FakturaContext context, IMapper mapper):
            base(context,mapper)
        {           
        }

        public override List<Faktura.Model.JedinicaMjere> Get(Faktura.Model.JedinicaMjereSearch search = null)
        {
            var set = Context.Set<Database.JedinicaMjere>().AsQueryable();

            if(!string.IsNullOrWhiteSpace(search?.Naziv))
            {
                set = set.Where(x => x.Naziv.Contains(search.Naziv)&& x.Obrisan==false);                
            }

            var list = set.Where(x=>x.Obrisan==false).ToList(); //samo ako nije obrisan da se prikazuje
            return _mapper.Map<List<Faktura.Model.JedinicaMjere>>(list);
        }

        public override Faktura.Model.JedinicaMjere Insert(JedinicaMjereInsert request)
        {
            var set = Context.Set<Database.JedinicaMjere>();
            Database.JedinicaMjere entity = _mapper.Map<Database.JedinicaMjere>(request);

            entity.Obrisan = false;

            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<Faktura.Model.JedinicaMjere>(entity);
        }

        public override Faktura.Model.JedinicaMjere GetById(int id)
        {
            var set = Context.Set<Database.JedinicaMjere>();
            var entity = set.Where(x=>x.JedinicaMjereId==id && x.Obrisan==false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.JedinicaMjere>(entity);
        }
        
    }
}
