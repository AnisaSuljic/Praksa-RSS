using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IKupacService:ICRUDService<Faktura.Model.Kupac,object,Faktura.Model.Requests.KupacInsertUpdate, Faktura.Model.Requests.KupacInsertUpdate>
    {
    }
}
