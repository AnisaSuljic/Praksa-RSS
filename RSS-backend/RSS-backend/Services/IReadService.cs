using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IReadService<T, TSearch> where T:class where TSearch:class
    {
        List<T> Get(TSearch search = null);
        T GetById(int id);
    }
}
