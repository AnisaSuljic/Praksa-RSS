using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IVrstaPlacanjaService : ICRUDService<Faktura.Model.VrstaPlacanja,object,Faktura.Model.Requests.VrstaPlacanjaInsertUpdate, Faktura.Model.Requests.VrstaPlacanjaInsertUpdate>
    {
    }
}
