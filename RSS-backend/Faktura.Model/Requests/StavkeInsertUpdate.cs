using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model.Requests
{
    public class StavkeInsertUpdate
    {
        public int? RacunId { get; set; }
        public int? KlijentId { get; set; }
        public int? DokumentId { get; set; }
        public int? RedniBroj { get; set; }
        public int? ArtiklId { get; set; }
        public decimal? Kolicina { get; set; }
        public decimal? Rabat { get; set; }
        public decimal? StopaPoreza { get; set; }
        public decimal? CijenaBezPdv { get; set; }
        public decimal? UlaznaCijena { get; set; }
        public decimal? Rabat1 { get; set; }
        public decimal? Rabat2 { get; set; }
        public decimal? NabavnaCijena { get; set; }
        public int? PorezId { get; set; }
        public DateTime? Datum { get; set; }
        public int? SkladisteIzlazId { get; set; }
    }
}
