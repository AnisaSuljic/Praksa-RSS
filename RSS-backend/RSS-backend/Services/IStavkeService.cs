using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IStavkeService:ICRUDService<Faktura.Model.Stavke,object,Faktura.Model.Requests.StavkeInsertUpdate, Faktura.Model.Requests.StavkeInsertUpdate>
    {
    }
}
