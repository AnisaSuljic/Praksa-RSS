using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface ISkladisteService : ICRUDService<Faktura.Model.Skladiste,object,Faktura.Model.Requests.SkladisteInsertUpdate, Faktura.Model.Requests.SkladisteInsertUpdate>
    {
    }
}
