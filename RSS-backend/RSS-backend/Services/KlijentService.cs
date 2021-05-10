using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Security.Policy;

namespace RSS_backend.Services
{
    public class KlijentService : BaseCRUDService<Faktura.Model.Klijent, Database.Klijent, Faktura.Model.KlijentSearch, Faktura.Model.Requests.KlijentInsertUpdate,
                                    Faktura.Model.Requests.KlijentInsertUpdate>, IKlijentService
    {
        public KlijentService(FakturaContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override List<Faktura.Model.Klijent> Get(Faktura.Model.KlijentSearch search = null)
        {
            var set = Context.Set<Database.Klijent>().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search?.Naziv))
            {
                set = set.Where(x => x.Naziv.ToLower().Contains(search.Naziv.ToLower()) && x.Obrisan == false);
            }
            if (!string.IsNullOrWhiteSpace(search?.Mjesto))
            {
                set = set.Where(x => x.Mjesto.ToLower().Contains(search.Mjesto.ToLower()) && x.Obrisan == false);
            }
            if (!string.IsNullOrWhiteSpace(search?.Idbroj))
            {
                set = set.Where(x => x.Idbroj.ToLower().Contains(search.Idbroj.ToLower()) && x.Obrisan == false);
            }

            var list = set.Where(x => x.Obrisan == false).ToList(); //samo ako nije obrisan da se prikazuje
            return _mapper.Map<List<Faktura.Model.Klijent>>(list);
        }
        public override Faktura.Model.Klijent Insert(Faktura.Model.Requests.KlijentInsertUpdate request)
        {
            var set = Context.Set<Database.Klijent>();
            Database.Klijent entity = _mapper.Map<Database.Klijent>(request);

            entity.Obrisan = false;
            //entity.PotvrdjenMail = false;

            set.Add(entity);
            Context.SaveChanges();

            VerifikacijaMejla(entity);

            return _mapper.Map<Faktura.Model.Klijent>(entity);
        }
        public async void VerifikacijaMejla(Klijent client)
        {
            var link = "localhost:4200/prijava/" + client.KlijentId;

            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress("fakturarsstest@gmail.com");
            message.To.Add(new MailAddress(client.Email));
            message.Subject = "Test";
            message.IsBodyHtml = true; //to make message body as html  
            message.Body =string.Format($"<a href=\"http://localhost:4200/prijava/\'{client.KlijentId}\'\">Potvrdite email klikom na ovaj link<a>");
            smtp.Port = 587;
            smtp.Host = "smtp.gmail.com"; //for gmail host  
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("fakturarsstest@gmail.com", "Mostar2021!");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Send(message);

            client.PotvrdjenMail = true;
            Context.SaveChanges();

            return;
        }
        public override Faktura.Model.Klijent GetById(int id)
        {
            var set = Context.Set<Database.Klijent>();
            var entity = set.Where(x => x.KlijentId == id && x.Obrisan == false).FirstOrDefault();
            return _mapper.Map<Faktura.Model.Klijent>(entity);
        }
        public override Faktura.Model.Klijent Delete(int id)
        {
            var set = Context.Set<Database.Klijent>();
            var entity = set.Find(id);

            if (entity != null)
            {
                entity.Obrisan = true;
            }
            Context.SaveChanges();
            return _mapper.Map<Faktura.Model.Klijent>(entity);
        }

    }
}
