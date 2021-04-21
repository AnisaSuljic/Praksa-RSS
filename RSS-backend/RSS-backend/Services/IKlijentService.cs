using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IKlijentService:ICRUDService<Faktura.Model.Klijent,Faktura.Model.KlijentSearch,Faktura.Model.Requests.KlijentInsertUpdate, Faktura.Model.Requests.KlijentInsertUpdate>
    {
    }
}
