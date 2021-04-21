using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public class Skladiste
    {
        public Skladiste()
        {
            //RacunSkladisteIzlazs = new HashSet<Racun>();
            //RacunSkladisteUlazs = new HashSet<Racun>();
            //Stavkes = new HashSet<Stavke>();
        }

        public int SkladisteId { get; set; }
        public string Naziv { get; set; }
        public int? KlijentId { get; set; }
        //public bool? Obrisan { get; set; }

        //public virtual Klijent Klijent { get; set; }
        //public virtual ICollection<Racun> RacunSkladisteIzlazs { get; set; }
        //public virtual ICollection<Racun> RacunSkladisteUlazs { get; set; }
        //public virtual ICollection<Stavke> Stavkes { get; set; }
    }
}
