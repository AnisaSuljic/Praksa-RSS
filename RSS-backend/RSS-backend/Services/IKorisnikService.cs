using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IKorisnikService:ICRUDService<Faktura.Model.Korisnik,Faktura.Model.KorisnikSearch,Faktura.Model.Requests.KorisnikInsertUpdate,
        Faktura.Model.Requests.KorisnikInsertUpdate>
    {
        Task<Faktura.Model.Korisnik> Login(string username, string password);
    }

}
