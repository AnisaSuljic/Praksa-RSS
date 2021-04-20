using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model.Requests
{
    public class JedinicaMjereUpdate
    {
        [Required]
        public string Naziv { get; set; }
    }
}
