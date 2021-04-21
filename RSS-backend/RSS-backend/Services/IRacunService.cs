using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IRacunService : ICRUDService<Faktura.Model.Racun,object,Faktura.Model.Requests.RacunInsertUpdate, Faktura.Model.Requests.RacunInsertUpdate>
    {
    }
}
