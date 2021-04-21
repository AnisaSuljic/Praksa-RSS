using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IGrupaService : ICRUDService<Faktura.Model.Grupa,object, Faktura.Model.Requests.GrupaInsertUpdate, Faktura.Model.Requests.GrupaInsertUpdate>
    {
    }
}
