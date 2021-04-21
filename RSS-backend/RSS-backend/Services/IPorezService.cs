using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IPorezService : ICRUDService<Faktura.Model.Porez,object,Faktura.Model.Requests.PorezInsertUpdate, Faktura.Model.Requests.PorezInsertUpdate>
    {
    }
}
