using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class BaseCRUDService<T, Tdb, TSearch, TInsert, TUpdate> : BaseReadService<T, Tdb, TSearch>, ICRUDService<T, TSearch, TInsert, TUpdate> where T : class where TSearch : class where TInsert : class where TUpdate : class where Tdb : class
    {
        public BaseCRUDService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public virtual T Insert(TInsert request)
        {
            var set = Context.Set<Tdb>();
            Tdb entity = _mapper.Map<Tdb>(request);
           
            set.Add(entity);
            Context.SaveChanges();

            return _mapper.Map<T>(entity);
        }

        public virtual T Update(int id, TUpdate request)
        {
            var set = Context.Set<Tdb>();
            var entity = set.Find(id);

            _mapper.Map(request, entity);

            Context.SaveChanges();

            return _mapper.Map<T>(entity);
        }

       
    }
}
