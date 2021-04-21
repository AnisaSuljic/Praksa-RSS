using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public partial class Grad
    {
        public Grad()
        {
            //Kupacs = new HashSet<Kupac>();
        }

        public int GradId { get; set; }
        public string Naziv { get; set; }
        public int? KlijentId { get; set; }
        //public bool? Obrisan { get; set; }

        //public virtual Klijent Klijent { get; set; }
        //public virtual ICollection<Kupac> Kupacs { get; set; }
    }
}
