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
        }

        public int SkladisteId { get; set; }
        public string Naziv { get; set; }
        public int? KlijentId { get; set; }
    }
}
