using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IValutaService : ICRUDService<Faktura.Model.Valuta,object,Faktura.Model.Requests.ValutaInsertUpdate, Faktura.Model.Requests.ValutaInsertUpdate>
    {
    }
}
