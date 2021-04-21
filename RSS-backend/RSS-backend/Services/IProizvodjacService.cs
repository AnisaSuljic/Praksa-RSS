using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IProizvodjacService:ICRUDService<Faktura.Model.Proizvodjac,object,Faktura.Model.Requests.ProizvodjacInsertUpdate,
        Faktura.Model.Requests.ProizvodjacInsertUpdate>
    {
    }
}
