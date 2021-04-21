using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IVrstaService:ICRUDService<Faktura.Model.Vrsta,object,Faktura.Model.Requests.VrstaInsertUpdate, Faktura.Model.Requests.VrstaInsertUpdate>
    {
    }
}
