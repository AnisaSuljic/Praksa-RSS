using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public partial class Porez
    {
        public Porez()
        {
        }

        public int PorezId { get; set; }
        public int? KlijentId { get; set; }
        public string NazivPoreza { get; set; }
        public decimal? Stopa { get; set; }
    }
}
