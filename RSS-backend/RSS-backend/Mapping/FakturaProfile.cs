using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Mapping
{
    public class FakturaProfile:Profile
    {
        public FakturaProfile()
        {
            //jedinica mjere
            CreateMap<Database.JedinicaMjere, Faktura.Model.JedinicaMjere>();
            CreateMap<Faktura.Model.Requests.JedinicaMjereInsert, JedinicaMjere>();
            CreateMap<Faktura.Model.Requests.JedinicaMjereUpdate, JedinicaMjere>();

            //klijent
            CreateMap<Database.Klijent, Faktura.Model.Klijent>();
            CreateMap<Faktura.Model.Requests.KlijentInsertUpdate, Klijent>();

            //korisnik
            CreateMap<Database.Korisnik, Faktura.Model.Korisnik>();
            CreateMap<Faktura.Model.Requests.KorisnikInsertUpdate, Korisnik>();
            
            //vrsta
            CreateMap<Database.Vrstum, Faktura.Model.Vrsta>();
            CreateMap<Faktura.Model.Requests.VrstaInsertUpdate, Vrstum>();

            //grupa
            CreateMap<Database.Grupa, Faktura.Model.Grupa>();
            CreateMap<Faktura.Model.Requests.GrupaInsertUpdate, Grupa>();

            //proizvodjac
            CreateMap<Database.Proizvodjac, Faktura.Model.Proizvodjac>();
            CreateMap<Faktura.Model.Requests.ProizvodjacInsertUpdate, Proizvodjac>();

            //artikl
            CreateMap<Database.Artikl, Faktura.Model.Artikl>();
            CreateMap<Faktura.Model.Requests.ArtiklInsertUpdate, Artikl>();

            //kupac
            CreateMap<Database.Kupac, Faktura.Model.Kupac>();
            CreateMap<Faktura.Model.Requests.KupacInsertUpdate, Kupac>();

            //grad
            CreateMap<Database.Grad, Faktura.Model.Grad>();
            CreateMap<Faktura.Model.Requests.GradInsertUpdate, Grad>();

            //racun
            CreateMap<Database.Racun, Faktura.Model.Racun>();
            CreateMap<Faktura.Model.Requests.RacunInsertUpdate, Racun>();

            //vrsta placanja
            CreateMap<Database.VrstaPlacanja, Faktura.Model.VrstaPlacanja>();
            CreateMap<Faktura.Model.Requests.VrstaPlacanjaInsertUpdate, VrstaPlacanja>();

            //skladiste
            CreateMap<Database.Skladiste, Faktura.Model.Skladiste>();
            CreateMap<Faktura.Model.Requests.SkladisteInsertUpdate, Skladiste>();

            //valuta
            CreateMap<Database.Valutum, Faktura.Model.Valuta>();
            CreateMap<Faktura.Model.Requests.ValutaInsertUpdate, Valutum>();
        }
    }
}
