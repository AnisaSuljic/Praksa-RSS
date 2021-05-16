using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model.Requests
{
    public class RacunInsertUpdate
    {
        public string BrojRacuna { get; set; }
        public int? KlijentId { get; set; }
        public int? KorisnikId { get; set; }
        public DateTime? DatumRacuna { get; set; }
        public DateTime? DatumDospjeca { get; set; }
        public int? SkladisteUlazId { get; set; }
        public int? SkladisteIzlazId { get; set; }
        public string EvidencijskiBroj { get; set; }
        public decimal? IznosRacuna { get; set; }
        public decimal? IznosPoreza { get; set; }
        public decimal? IznosSaPdv { get; set; }

        public int? KupacId { get; set; }
        public int? VrstaPlacanjaId { get; set; }
        public int? DokumentId { get; set; }
        public int? ValutaId { get; set; }
        public bool? Placen { get; set; }
        public string Napomena { get; set; }
    }
}
