using AutoMapper;
using Faktura.Model.Requests;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public class BaseReadService<T, Tdb, TSearch> : IReadService<T, TSearch> where T:class where Tdb:class where TSearch:class
    {
        protected readonly IMapper _mapper;
        public FakturaContext Context { get; set; }

        public BaseReadService(FakturaContext context, IMapper mapper)
        {
            Context = context;
            _mapper = mapper;
        }
        public virtual List<T> Get(TSearch search)
        {
            var set = Context.Set<Tdb>();
            var list = set.ToList();
            return _mapper.Map<List<T>>(list);
        }
        //public virtual List<T> GetAll()
        //{
        //    var set = Context.Set<Tdb>();
        //    var list = set.ToList();
        //    return _mapper.Map<List<T>>(list);
        //}
        public virtual T GetById(int id)
        {
            var set = Context.Set<Tdb>();
            var entity = set.Find(id);
            return _mapper.Map<T>(entity);
        }
    }
}
