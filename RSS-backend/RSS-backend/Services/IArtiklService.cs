using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IArtiklService:ICRUDService<Faktura.Model.Artikl,object,Faktura.Model.Requests.ArtiklInsertUpdate, Faktura.Model.Requests.ArtiklInsertUpdate>
    {
    }
}
