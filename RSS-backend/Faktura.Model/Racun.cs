using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public partial class Racun
    {
        public Racun()
        {
        }

        public int RacunId { get; set; }
        public string BrojRacuna { get; set; }
        public int? KlijentId { get; set; }
        public int? KorisnikId { get; set; }
        public DateTime? Datum { get; set; }
        public DateTime? DatumRacuna { get; set; }
        public DateTime? DatumDospjeca { get; set; }
        public int? SkladisteUlazId { get; set; }
        public int? SkladisteIzlazId { get; set; }
        public string EvidencijskiBroj { get; set; }
        public decimal? IznosRacuna { get; set; }
        public decimal? IznosSaPdv { get; set; }

        public decimal? IznosPoreza { get; set; }
        public int? KupacId { get; set; }
        public int? VrstaPlacanjaId { get; set; }
        public int? Godina { get; set; }
        public int? DokumentId { get; set; }
        public int? ValutaId { get; set; }
        public bool? Placen { get; set; }
        public string Napomena { get; set; }
        public int? Fisbroj { get; set; }

    }
}
