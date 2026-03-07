// Hierarchical location data for African countries
// Country → Level1 (County/Region/State) → Level2 (Constituency/District) → Level3 (Ward/Sub-county)

export interface CountryConfig {
  name: string;
  level1Label: string;
  level2Label: string;
  level3Label: string;
  divisions: Record<string, Record<string, string[]>>;
}

const locationData: Record<string, CountryConfig> = {
  Kenya: {
    name: "Kenya",
    level1Label: "County",
    level2Label: "Constituency",
    level3Label: "Ward",
    divisions: {
      "Baringo": {
        "Baringo Central": ["Kabarnet", "Sacho", "Tenges", "Ewalel/Chapchap", "Kapropita"],
        "Baringo North": ["Baringo North", "Bartabwa", "Kabartonjo", "Saimo/Kipsaraman", "Saimo/Soi"],
        "Baringo South": ["Marigat", "Ilchamus", "Mochongoi", "Mukutani"],
        "Eldama Ravine": ["Eldama Ravine", "Lembus", "Lembus/Kwen", "Ravine", "Koibatek"],
        "Mogotio": ["Mogotio", "Emining", "Kisanana"],
        "Tiaty": ["Tirioko", "Kolowa", "Ribkwo", "Silale", "Loyamorok", "Tangulbei/Korossi"]
      },
      "Bomet": {
        "Bomet Central": ["Silibwet", "Ndaraweta", "Singorwet", "Chesoen", "Mutarakwa"],
        "Bomet East": ["Merigi", "Kembu", "Longisa", "Kipreres", "Chemaner"],
        "Chepalungu": ["Chepalungu", "Kongasis", "Nyangores", "Sigor", "Siongiroi"],
        "Konoin": ["Kimulot", "Mogogosiek", "Boito", "Embonut", "Chepchabas"],
        "Sotik": ["Ndanai/Abosi", "Chemagel", "Kipsonoi", "Kapletundo", "Rongena/Manaret"]
      },
      "Bungoma": {
        "Bumula": ["Bumula", "Khasoko", "Kabula", "Kimaeti", "South Bukusu", "Siboti"],
        "Kabuchai": ["Kabuchai/Chwele", "West Nalondo", "Bwake/Luuya", "Mukuyuni"],
        "Kanduyi": ["Khalaba", "Bukembe West", "Bukembe East", "Township", "Musikoma", "East Sang'alo", "Marakaru/Tuuti", "West Sang'alo"],
        "Kimilili": ["Kimilili", "Kibingei", "Maeni", "Kamukuywa"],
        "Mt Elgon": ["Cheptais", "Chesikaki", "Chepyuk", "Kapkateny", "Kaptama", "Elgon"],
        "Sirisia": ["Namwela", "Malakisi/South Kulisiru", "Lwandanyi"],
        "Tongaren": ["Mbakalo", "Naitiri/Kabuyefwe", "Milima", "Ndalu/Tabani", "Tongaren", "Soysambu/Mitua"],
        "Webuye East": ["Mihuu", "Ndivisi", "Maraka"],
        "Webuye West": ["Sitikho", "Matulo", "Bokoli", "Misikhu", "Webuye"]
      },
      "Busia": {
        "Budalangi": ["Bunyala South", "Bunyala Central", "Bunyala North", "Bunyala West"],
        "Butula": ["Marachi West", "Kingandole", "Marachi Central", "Marachi East", "Marachi North", "Elugulu"],
        "Funyula": ["Namboboto/Nambuku", "Nangina", "Ageng'a/Nanguba", "Bwiri"],
        "Matayos": ["Bukhayo West", "Bukhayo East", "Bukhayo North/Waltsi", "Burumba", "Matayos South"],
        "Nambale": ["Nambale Township", "Bukhayo Central", "Malaba Central", "Malaba North", "Malaba South"],
        "Teso North": ["Malaba Township", "Angurai East", "Angurai North", "Angurai South", "Amukura West", "Amukura East", "Amukura Central"],
        "Teso South": ["Angorom", "Chakol South", "Chakol North", "Amukura", "Ang'urai"]
      },
      "Elgeyo-Marakwet": {
        "Keiyo North": ["Emsoo", "Kamariny", "Kapchemutwa", "Tambach", "Metkei"],
        "Keiyo South": ["Kabiemit", "Kaptarakwa", "Chepkorio", "Soy North", "Soy South", "Metkei"],
        "Marakwet East": ["Endo", "Embobut/Embolot", "Sambirir", "Kapyego", "Kapsowar"],
        "Marakwet West": ["Lelan", "Sengwer", "Cherang'any/Chebororwa", "Moiben/Kuserwo", "Kapsowar", "Arror"]
      },
      "Embu": {
        "Manyatta": ["Ruguru/Ngandori", "Kithimu", "Nginda", "Mbeti North", "Kirimari", "Gaturi South", "Gaturi North"],
        "Mbeere North": ["Nthawa", "Muminji", "Evurore", "Siakago"],
        "Mbeere South": ["Mwea", "Makima", "Mbeti South", "Mavuria", "Kiambere"],
        "Runyenjes": ["Kagaari South", "Central Ward", "Kagaari North", "Kyeni South", "Kyeni North"]
      },
      "Garissa": {
        "Balambala": ["Balambala", "Danyere", "Jara Jara", "Saka", "Sankuri"],
        "Dadaab": ["Dertu", "Dadaab", "Labisgale", "Damajale", "Liboi", "Abakaile"],
        "Fafi": ["Bura", "Dekaharia", "Jarajila", "Fafi", "Nanighi"],
        "Garissa Township": ["Waberi", "Galbet", "Township", "Iftin"],
        "Hulugho": ["Sangailu", "Hulugho", "Masalani"],
        "Ijara": ["Ijara", "Masalani", "Hulugho"],
        "Lagdera": ["Baraki", "Goreale", "Maalimin", "Sabena", "Modogashe", "Benane"]
      },
      "Homa Bay": {
        "Homa Bay Town": ["Homa Bay Arujo", "Homa Bay West", "Homa Bay Central", "Homa Bay East"],
        "Kabondo Kasipul": ["Kabondo East", "Kabondo West", "Kokwanyo/Kakelo", "Kojwach"],
        "Karachuonyo": ["Wang'chieng", "Kendu Bay Town", "Kanyaluo", "North Karachuonyo", "Kibiri", "West Karachuonyo", "Kanyadhiang"],
        "Kasipul": ["West Kasipul", "South Kasipul", "Central Kasipul", "East Kamagak", "West Kamagak"],
        "Mbita": ["Mfangano Island", "Rusinga Island", "Kasgunga", "Gembe", "Lambwe"],
        "Ndhiwa": ["Kwabwai", "Kanyadoto", "Kanyikela", "Kabuoch North", "Kabuoch South/Pala", "Kanyamwa Kologi", "Kanyamwa Kosewe"],
        "Rangwe": ["West Gem", "East Gem", "Kagan", "Kochia"],
        "Suba South": ["Gwassi South", "Gwassi North", "Kaksingri West", "Ruma/Kaksingri East"]
      },
      "Isiolo": {
        "Garbatulla": ["Kinna", "Garbatulla", "Sericho"],
        "Isiolo North": ["Wabera", "Bulla Pesa", "Chari", "Cherab", "Burat", "Oldonyiro", "Merti"],
        "Isiolo South": ["Garbatulla", "Kinna", "Sericho"]
      },
      "Kajiado": {
        "Kajiado Central": ["Purko", "Ildamat", "Dalalekutuk", "Matapato North", "Matapato South"],
        "Kajiado East": ["Oloosirkon/Sholinke", "Kitengela", "Kenyawa-Poka", "Imaroro", "Kaputiei North"],
        "Kajiado North": ["Olkeri", "Ongata Rongai", "Nkaimurunya", "Oloolua", "Ngong"],
        "Kajiado South": ["Entonet/Lenkisim", "Mbirikani/Eselenkei", "Kuku", "Rombo", "Kimana"],
        "Kajiado West": ["Keekonyokie", "Iloodokilani", "Magadi", "Ewuaso Oo Nkidong'i", "Mosiro"]
      },
      "Kakamega": {
        "Butere": ["Marama West", "Marama Central", "Marenyo-Shianda", "Marama North", "Marama South"],
        "Ikolomani": ["Idakho South", "Idakho East", "Idakho North", "Idakho Central"],
        "Khwisero": ["Kisa West", "Kisa East", "Kisa Central", "Kisa North"],
        "Likuyani": ["Likuyani", "Sango", "Kongoni", "Nzoia", "Sinoko"],
        "Lugari": ["Mautuma", "Lugari", "Lumakanda", "Chekalini", "Chevaywa", "Lwandeti"],
        "Lurambi": ["Butsotso East", "Butsotso South", "Butsotso Central", "Mahiakalo", "Shirere", "Sheywe"],
        "Malava": ["West Kabras", "Chemuche", "East Kabras", "Butali/Chegulo", "Manda-Shivanga", "Shirugu-Mugai", "South Kabras"],
        "Matungu": ["Koyonzo", "Kholera", "Khalaba", "Mayoni", "Namamali"],
        "Mumias East": ["East Wanga", "Malaha/Isongo/Makunga", "Lusheya/Lubinu"],
        "Mumias West": ["Mumias Central", "Mumias North", "Etenje", "Musanda"],
        "Navakholo": ["Ingotse-Matiha", "Shinoyi-Shikomari-Esumeyia", "Bunyala West", "Bunyala Central", "Bunyala East"]
      },
      "Kericho": {
        "Ainamoi": ["Ainamoi", "Kapkugerwet", "Kipchebor", "Kipchimchim", "Kapsaos", "Kapkatet"],
        "Belgut": ["Waldai", "Kabianga", "Cheptororiet/Seretut", "Chaik", "Kapsuser"],
        "Bureti": ["Chemosot", "Litein", "Cheplanget", "Kapkatet", "Kisiara", "Tebesonik"],
        "Kipkelion East": ["Londiani", "Kedowa/Kimugul", "Chepseon", "Tendeno/Sorget"],
        "Kipkelion West": ["Kunyak", "Kamasian", "Kipkelion", "Chilchila", "Fort Ternan"],
        "Sigowet/Soin": ["Sigowet", "Kaplelartet", "Soliat", "Soin"]
      },
      "Kiambu": {
        "Gatundu North": ["Gituamba", "Githobokoni", "Chania", "Mang'u"],
        "Gatundu South": ["Kiamwangi", "Kiganjo", "Ndarugu", "Ngenda"],
        "Githunguri": ["Githiga", "Githunguri", "Ikinu", "Ngewa", "Komothai"],
        "Juja": ["Murera", "Theta", "Juja", "Witeithie", "Kalimoni"],
        "Kabete": ["Gitaru", "Muguga", "Nyadhuna", "Kabete", "Uthiru"],
        "Kiambaa": ["Cianda", "Karuri", "Ndenderu", "Muchatha", "Kihara"],
        "Kiambu Town": ["Township", "Ting'ang'a", "Ndumberi", "Riabai"],
        "Kikuyu": ["Karai", "Nachu", "Sigona", "Kikuyu", "Kinoo"],
        "Lari": ["Kinale", "Kijabe", "Nyanduma", "Kamburu", "Lari/Kirenga"],
        "Limuru": ["Limuru Central", "Ndeiya", "Limuru East", "Ngecha Tigoni", "Bibirioni"],
        "Ruiru": ["Gitothua", "Biashara", "Gatongora", "Kahawa Sukari", "Kahawa Wendani", "Kiuu", "Mwiki", "Mwihoko"],
        "Thika Town": ["Township", "Kamenu", "Hospital", "Gatuanyaga", "Ngoliba"]
      },
      "Kilifi": {
        "Ganze": ["Bamba", "Jaribuni", "Sokoke", "Ganze"],
        "Kaloleni": ["Kaloleni", "Mwanamwinga", "Tsangatsini", "Mdzongoloni"],
        "Kilifi North": ["Tezo", "Sokoni", "Kibarani", "Dabaso", "Matsangoni", "Watamu", "Mnarani"],
        "Kilifi South": ["Junju", "Mwarakaya", "Shimo la Tewa", "Chasimba", "Mtepeni"],
        "Magarini": ["Marafa", "Magarini", "Gongoni", "Adu", "Garashi", "Sabaki"],
        "Malindi": ["Malindi Town", "Shella", "Ganda", "Jilore", "Kakuyuni"],
        "Rabai": ["Mwawesa", "Ruruma", "Kambe/Ribe", "Rabai/Kisurutini"]
      },
      "Kirinyaga": {
        "Gichugu": ["Kabare", "Baragwi", "Njukiini", "Ngariama"],
        "Kirinyaga Central": ["Mutira", "Kanyekini", "Kerugoya", "Inoi"],
        "Mwea": ["Mutithi", "Kangai", "Wamumu", "Nyangati", "Murinduko", "Gathigiriri", "Tebere"],
        "Ndia": ["Mukure", "Kiine", "Kariti", "Karumandi"]
      },
      "Kisii": {
        "Bobasi": ["Bobasi Central", "Bobasi Bogetaorio", "Bobasi Chache", "Nyacheki", "Bobasi Boitangare", "Basi South Mugirango"],
        "Bomachoge Borabu": ["Bomariba", "Bokimonge", "Magenche", "Bombaba Borabu"],
        "Bomachoge Chache": ["Masige West", "Masige East", "Ichuni", "Majoge Basi", "Boochi/Tendere"],
        "Bonchari": ["Bomorenda", "Boikanga", "Basi Central", "Bassi Bogetaorio"],
        "Kitutu Chache North": ["Bogusero", "Bogeka", "Nyakoe", "Bogiakumu", "Bomoreri"],
        "Kitutu Chache South": ["Tabaka", "Boikanga", "Bomwagamo", "Basi Bogetaorio"],
        "Nyaribari Chache": ["Keumbu", "Kiogoro", "Birongo", "Bobaracho", "Kisii Central"],
        "Nyaribari Masaba": ["Ichuni", "Nyamasibi", "Masimba", "Gesusu", "Kiamokama"],
        "South Mugirango": ["Tabaka", "Bogetenga", "Boikanga", "Moticho", "Getenga"]
      },
      "Kisumu": {
        "Kisumu Central": ["Railways", "Migosi", "Shaurimoyo Kaloleni", "Market Milimani", "Kondele", "Nyalenda B"],
        "Kisumu East": ["Kajulu", "Kolwa East", "Manyatta B", "Nyalenda A", "Kolwa Central"],
        "Kisumu West": ["South West Kisumu", "Central Kisumu", "Kisumu North", "West Kisumu", "North West Kisumu"],
        "Muhoroni": ["Muhoroni/Koru", "Miwani", "Ombeyi", "Masogo/Nyang'oma", "Chemelil/Chemase"],
        "Nyakach": ["South West Nyakach", "North Nyakach", "Central Nyakach", "West Nyakach", "South East Nyakach"],
        "Nyando": ["East Kano/Wawidhi", "Awasi/Onjiko", "Ahero", "Kabonyo/Kanyagwal", "Kobura"],
        "Seme": ["West Seme", "Central Seme", "East Seme", "North Seme"]
      },
      "Kitui": {
        "Kitui Central": ["Miambani", "Township", "Kyangwithya West", "Mulango", "Kyangwithya East"],
        "Kitui East": ["Zombe/Mwitika", "Chuluni", "Nuu", "Mutha", "Ikanga"],
        "Kitui Rural": ["Kisasi", "Mbitini", "Kwavonza/Yatta", "Kanyangi"],
        "Kitui South": ["Ikutha", "Kanziko", "Mutomo", "Mutha", "Kithumula"],
        "Kitui West": ["Mutonguni", "Kauwi", "Matinyani", "Kwa Mutonga/Kithumula"],
        "Mwingi Central": ["Central", "Kivou", "Nguni", "Nuu", "Mui"],
        "Mwingi North": ["Ngomeni", "Kyuso", "Mumoni", "Tseikuru", "Tharaka"],
        "Mwingi West": ["Kyome/Thaana", "Nguutani", "Migwani", "Kiomo/Kyethani"]
      },
      "Kwale": {
        "Kinango": ["Ndavaya", "Puma", "Kinango", "Mackinnon Road", "Chengoni/Samburu", "Mwavumbo"],
        "Lungalunga": ["Dzombo", "Lungalunga", "Mwereni", "Vanga", "Pongwe/Kikoneni"],
        "Matuga": ["Tsimba Golini", "Waa", "Tiwi", "Kubo South", "Mkongani"],
        "Msambweni": ["Gombato Bongwe", "Ukunda", "Kinondo", "Ramisi", "Diani"]
      },
      "Laikipia": {
        "Laikipia East": ["Ngobit", "Tigithi", "Thingithu", "Nanyuki"],
        "Laikipia North": ["Olmoran", "Rumuruti Township", "Sosian/Maralal", "Segera", "Mukogodo West", "Mukogodo East"],
        "Laikipia West": ["Igwamiti", "Marmanet", "Salama", "Ol-Moran", "Rumuruti"]
      },
      "Lamu": {
        "Lamu East": ["Faza", "Kiunga", "Basuba"],
        "Lamu West": ["Shella", "Mkomani", "Hindi", "Mkunumbi", "Hongwe", "Witu", "Bahari"]
      },
      "Machakos": {
        "Kangundo": ["Kangundo North", "Kangundo Central", "Kangundo East", "Kangundo West"],
        "Kathiani": ["Mitaboni", "Kathiani Central", "Upper Kaewa/Iveti", "Lower Kaewa/Kaani"],
        "Machakos Town": ["Kalama", "Mua", "Mutituni", "Machakos Central", "Mumbuni North", "Muvuti/Kiima-Kimwe"],
        "Masinga": ["Muthesya", "Masinga Central", "Ekalakala", "Kivaa", "Ndithini"],
        "Matungulu": ["Tala", "Matungulu North", "Matungulu East", "Matungulu West", "Kyeleni"],
        "Mavoko": ["Athi River", "Kinanie", "Muthwani", "Syokimau/Mulolongo"],
        "Mwala": ["Mbiuni", "Makutano/Mwala", "Masii", "Muthetheni", "Wamunyu", "Kibauni"],
        "Yatta": ["Ndalani", "Matuu", "Kithimani", "Ikombe", "Katangi"]
      },
      "Makueni": {
        "Kaiti": ["Ukia", "Kee", "Kilungu", "Ilima"],
        "Kibwezi East": ["Masongaleni", "Mtito Andei", "Thange", "Ivingoni/Nzambani"],
        "Kibwezi West": ["Makindu", "Nguu/Masumba", "Emali/Mulala", "Kikumbulyu North", "Kikumbulyu South"],
        "Kilome": ["Kasikeu", "Mukaa", "Kiima Kiu/Kalanzoni"],
        "Makueni": ["Wote", "Muvau/Kikuumini", "Mavindini", "Kitise/Kithuki", "Kathonzweni", "Nzaui/Kilili/Kalamba", "Mbitini"],
        "Mbooni": ["Tulimani", "Mbooni", "Kithungo/Kitundu", "Kisau/Kiteta", "Waia/Kako"]
      },
      "Mandera": {
        "Banissa": ["Banissa", "Derkhale", "Guba", "Malkamari", "Kiliwehiri"],
        "Lafey": ["Lafey", "Sala", "Fino", "Warankara", "Alungu Gof"],
        "Mandera East": ["Khalalio", "Township", "Neboi", "Arabia"],
        "Mandera North": ["Ashabito", "Guticha", "Morothile", "Rhamu", "Rhamu-Dimtu"],
        "Mandera South": ["Wargadud", "Kutulo", "Shimbir Fatuma", "Elwak South", "Elwak North"],
        "Mandera West": ["Takaba South", "Takaba", "Lagsure", "Dandu", "Gither"]
      },
      "Marsabit": {
        "Laisamis": ["Loiyangalani", "Kargi/South Horr", "Korr/Ngurunit", "Logo Logo", "Laisamis"],
        "Moyale": ["Butiye", "Sololo", "Heilu/Manyatta", "Golbo", "Moyale Township", "Uran"],
        "North Horr": ["Dukana", "Maikona", "Turbi", "North Horr", "Illeret"],
        "Saku": ["Marsabit Central", "Sagante/Jaldesa", "Karare", "Marsabit"]
      },
      "Meru": {
        "Buuri": ["Timau", "Kisima", "Kiirua/Naari", "Ruiri/Rwarera"],
        "Central Imenti": ["Mwanganthia", "Abothuguchi Central", "Abothuguchi West", "Kiagu", "Athiru Gaiti"],
        "Igembe Central": ["Kangeta", "Njia", "Igembe East", "Athiru Ruujine"],
        "Igembe North": ["Antuambui", "Ntunene", "Antubochiu", "Naathu", "Amwathi"],
        "Igembe South": ["Maua", "Kiegoi/Antubetwe Kiongo", "Athiru Gaiti", "Akachiu", "Kanuni"],
        "North Imenti": ["Municipality", "Ntima East", "Ntima West", "Nyaki West", "Nyaki East"],
        "South Imenti": ["Mitunguu", "Igoji East", "Igoji West", "Abogeta East", "Abogeta West", "Nkuene"],
        "Tigania East": ["Thangatha", "Mikinduri", "Kiguchwa", "Muthara", "Karama"],
        "Tigania West": ["Athwana", "Akithi", "Kianjai", "Nkomo", "Mbeu"]
      },
      "Migori": {
        "Awendo": ["North Kamagambo", "South Kamagambo", "West Kamagambo", "Central Kamagambo"],
        "Kuria East": ["Gokeharaka/Getambwega", "Ntimaru East", "Ntimaru West", "Nyabasi East", "Nyabasi West"],
        "Kuria West": ["Bukira East", "Bukira Central/Ikerege", "Isibania", "Makerero", "Masaba", "Tagare"],
        "Nyatike": ["Kachieng", "Kanyasa", "North Kadem", "Macalder/Kanyarwanda", "Kaler", "Got Kachola", "Muhuru"],
        "Rongo": ["North Kamagambo", "Central Kamagambo", "East Kamagambo", "South Kamagambo"],
        "Suna East": ["God Jope", "Suna Central", "Kakrao", "Kwa"],
        "Suna West": ["Wasimbete", "Wiga", "Wasweta II", "Ragana-Oruba"],
        "Uriri": ["West Kanyamkago", "North Kanyamkago", "Central Kanyamkago", "South Kanyamkago", "East Kanyamkago"]
      },
      "Mombasa": {
        "Changamwe": ["Port Reitz", "Kipevu", "Airport", "Changamwe", "Chaani"],
        "Jomvu": ["Jomvu Kuu", "Miritini", "Mikindani"],
        "Kisauni": ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Mtopanga", "Magogoni", "Shanzu"],
        "Likoni": ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"],
        "Mvita": ["Mji Wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"],
        "Nyali": ["Frere Town", "Ziwa La Ng'ombe", "Mkomani", "Kongowea", "Nyali", "Kadzandani"]
      },
      "Murang'a": {
        "Gatanga": ["Ithanga", "Kakuzi/Mitubiri", "Mugumo-ini", "Kihumbu-ini", "Gatanga", "Kariara"],
        "Kahuro": ["Mugoiri", "Mbiri", "Kahuro", "Murarandia"],
        "Kandara": ["Ngelelya", "Muruka", "Kagundu-ini", "Gaichanjiru", "Ithiru", "Ruchu"],
        "Kangema": ["Kanyenya-ini", "Muguru", "Rwathia"],
        "Kigumo": ["Muthithi", "Kigumo", "Kangari", "Kinyona"],
        "Kiharu": ["Wangu", "Mugoiri", "Mbiri", "Township", "Murarandia", "Gaturi"],
        "Mathioya": ["Kamacharia", "Kiru", "Kimorori/Wempa", "Muhoya"],
        "Maragwa": ["Ichagaki", "Nginda", "Makuyu", "Kamahuha", "Ichagaki", "Ithiru"]
      },
      "Nairobi": {
        "Dagoretti North": ["Kilimani", "Kawangware", "Gatina", "Kileleshwa", "Kabiro"],
        "Dagoretti South": ["Mutu-ini", "Ngando", "Riruta", "Uthiru/Ruthimitu", "Waithaka"],
        "Embakasi Central": ["Kayole North", "Kayole South", "Komarock", "Matopeni/Spring Valley", "Umoja I"],
        "Embakasi East": ["Upper Savanna", "Lower Savanna", "Embakasi", "Utawala", "Mihango"],
        "Embakasi North": ["Kariobangi North", "Dandora Area I", "Dandora Area II", "Dandora Area III", "Dandora Area IV"],
        "Embakasi South": ["Imara Daima", "Kwa Njenga", "Kwa Reuben", "Pipeline", "Kware"],
        "Embakasi West": ["Umoja I", "Umoja II", "Mowlem", "Kariobangi South"],
        "Kamukunji": ["Pumwani", "Eastleigh North", "Eastleigh South", "Airbase", "California"],
        "Kasarani": ["Clay City", "Mwiki", "Kasarani", "Njiru", "Ruai"],
        "Kibra": ["Laini Saba", "Lindi", "Makina", "Woodley/Kenyatta Golf Course", "Sarangombe"],
        "Langata": ["Karen", "Nairobi West", "Mugumo-ini", "South C", "Nyayo Highrise"],
        "Makadara": ["Maringo/Hamza", "Viwandani", "Harambee", "Makongeni"],
        "Mathare": ["Hospital", "Mabatini", "Huruma", "Ngei", "Mlango Kubwa", "Kiamaiko"],
        "Roysambu": ["Githurai", "Kahawa West", "Zimmerman", "Roysambu", "Kahawa"],
        "Ruaraka": ["Babadogo", "Utalii", "Mathare North", "Lucky Summer", "Korogocho"],
        "Starehe": ["Nairobi Central", "Ngara", "Pangani", "Ziwani/Kariokor", "Landimawe", "Nairobi South"],
        "Westlands": ["Kitisuru", "Parklands/Highridge", "Karura", "Kangemi", "Mountain View"]
      },
      "Nakuru": {
        "Bahati": ["Bahati", "Dundori", "Kabazi", "Kiamaina", "Lanet/Umoja"],
        "Gilgil": ["Gilgil", "Elementaita", "Mbaruk/Eburu", "Malewa West", "Murindati"],
        "Kuresoi North": ["Kiptororo", "Nyota", "Sirikwa", "Kamara", "Tinet"],
        "Kuresoi South": ["Amalo", "Keringet", "Kiptagich", "Tinet"],
        "Molo": ["Elburgon", "Mariashoni", "Turi", "Molo"],
        "Naivasha": ["Biashara", "Hells Gate", "Lake View", "Mai Mahiu", "Maiella", "Olkaria", "Naivasha East", "Viwandani"],
        "Nakuru Town East": ["Biashara", "Kivumbini", "Flamingo", "Menengai", "Nakuru East"],
        "Nakuru Town West": ["Barut", "London", "Kaptembwo", "Rhoda", "Shaabab"],
        "Njoro": ["Kihingo", "Nessuit", "Mau Narok", "Mauche", "Njoro", "Lare"],
        "Rongai": ["Menengai West", "Soin", "Visoi", "Mosop", "Solai"],
        "Subukia": ["Subukia", "Waseges", "Kabazi"]
      },
      "Nandi": {
        "Aldai": ["Kaptumo-Kaboi", "Kosirai", "Nandi Hills", "Kabiyet", "Terik"],
        "Chesumei": ["Chemundu/Kapng'etuny", "Kosirai", "Lelmokwo/Ngechek", "Kaptel/Kamoiywo", "Kiptuya"],
        "Emgwen": ["Chepkumia", "Kapkangani", "Kapsabet", "Kilibwoni"],
        "Mosop": ["Chepterwai", "Kipkaren", "Kurgung/Surungai", "Kabiemit", "Sangalo/Kebulonik", "Kabisaga"],
        "Nandi Hills": ["Nandi Hills", "Chepkunyuk", "Ol'lessos", "Kapchorua"],
        "Tinderet": ["Songhor/Soba", "Tinderet", "Chemelil/Chemase", "Kapsimotwo"]
      },
      "Narok": {
        "Emurua Dikirr": ["Ilkerin", "Ololmasani", "Mogondo", "Kapsasian"],
        "Kilgoris": ["Kilgoris Central", "Keyian", "Angata Barikoi", "Shankoe", "Kimintet", "Lolgorian"],
        "Narok East": ["Ildamat", "Keekonyokie", "Mosiro", "Suswa"],
        "Narok North": ["Olposimoru", "Olokurto", "Narok Town", "Nkareta", "Olorropil", "Melili"],
        "Narok South": ["Majimoto/Naroosura", "Ololulung'a", "Melelo", "Loita", "Sogoo", "Sagamian"],
        "Narok West": ["Ilmotiok", "Mara", "Siana", "Naikarra", "Olkinyei"]
      },
      "Nyamira": {
        "Borabu": ["Mekenene", "Manga", "Kemera", "Esise"],
        "Kitutu Masaba": ["Rigoma", "Gachuba", "Kemera", "Magombo", "Manga"],
        "Masaba North": ["Rigoma", "Gachuba", "Gesima", "Masaba", "Gesusu"],
        "North Mugirango": ["Itibo", "Bomwagamo", "Bokeira", "Magwagwa", "Ekerenyo"],
        "West Mugirango": ["Nyamaiya", "Bogichora", "Bosamaro", "Bonyamatuta", "Township"]
      },
      "Nyandarua": {
        "Kinangop": ["Engineer", "Gathara", "North Kinangop", "Murungaru", "Njabini/Kiburu", "Nyakio", "Gathabai"],
        "Kipipiri": ["Geta", "Githioro", "Magumu", "Wanjohi", "Kipipiri"],
        "Ndaragwa": ["Leshau/Pondo", "Kiriita", "Central", "Shamata"],
        "Ol Jorok": ["Gathanji", "Gatimu", "Weru", "Charagita"],
        "Ol Kalou": ["Ol Kalou", "Kanjuiri Range", "Karau", "Rurii"]
      },
      "Nyeri": {
        "Kieni East": ["Naromoru/Kiama", "Kabaru", "Gakawa", "Ruguru", "Thegu River"],
        "Kieni West": ["Mugunda", "Mweiga", "Mwiyogo/Endarasha", "Mbiriri", "Gatarakwa", "Aguthi/Gaaki"],
        "Mathira East": ["Karatina Town", "Mahiga", "Iria-ini", "Konyu", "Ruguru"],
        "Mathira West": ["Blue Valley", "Kirimukuyu", "Magutu"],
        "Mukurweini": ["Gikondi", "Rugi", "Mukurwe-ini West", "Mukurwe-ini Central"],
        "Nyeri Town": ["Kamakwa/Mukaro", "Dedan Kimathi", "Aguthi/Gaaki", "Ruring'u", "Gatitu/Muruguru"],
        "Othaya": ["Mahiga", "Iria-ini", "Chinga", "Karima"],
        "Tetu": ["Dedan Kimathi", "Wamagana", "Aguthi/Gaaki", "Tetu"]
      },
      "Samburu": {
        "Samburu East": ["Waso", "Wamba West", "Wamba East", "Wamba North"],
        "Samburu North": ["El-Barta", "Nachola", "Ndoto", "Nyiro", "Angata Nanyokie", "Baawa"],
        "Samburu West": ["Lodokejek", "Suguta Marmar", "Maralal", "Loosuk", "Porro"]
      },
      "Siaya": {
        "Alego Usonga": ["Usonga", "West Alego", "Central Alego", "Siaya Township", "North Alego", "South East Alego"],
        "Bondo": ["West Yimbo", "Central Sakwa", "South Sakwa", "Yimbo East", "West Sakwa", "North Sakwa"],
        "Gem": ["West Gem", "Central Gem", "East Gem", "Yala Township", "North Gem", "South Gem"],
        "Rarieda": ["East Asembo", "West Asembo", "North Uyoma", "South Uyoma", "West Uyoma"],
        "Ugenya": ["West Ugenya", "Ukwala", "North Ugenya", "East Ugenya"],
        "Ugunja": ["Sidindi", "Sigomere", "Ugunja"]
      },
      "Taita-Taveta": {
        "Mwatate": ["Mwatate", "Bura", "Chawia", "Wundanyi", "Wumingu/Kishushe", "Mbololo"],
        "Taveta": ["Chala", "Mahoo", "Bomeni", "Mboghoni", "Mata", "Ronge"],
        "Voi": ["Mbololo", "Sagalla", "Kaloleni", "Ngolia", "Kasigau"],
        "Wundanyi": ["Wundanyi/Mbale", "Werugha", "Wumingu/Kishushe", "Mwanda/Mgange"]
      },
      "Tana River": {
        "Bura": ["Bangale", "Sala", "Madogo", "Bura", "Chewani", "Wayu"],
        "Galole": ["Wayu", "Chewele", "Mikinduni", "Kinakomba", "Kipini East", "Kipini West"],
        "Garsen": ["Kipini East", "Garsen South", "Garsen Central", "Garsen West", "Garsen North", "Kipini West"]
      },
      "Tharaka-Nithi": {
        "Chuka/Igambang'ombe": ["Karingani", "Mariani", "Magumoni", "Mugwe", "Igambang'ombe"],
        "Maara": ["Mitheru", "Muthambi", "Mwimbi", "Chogoria", "Marima"],
        "Tharaka North": ["Gatunga", "Mukothima", "Nkondi", "Chiakariga"],
        "Tharaka South": ["Marimanti", "Igambang'ombe", "Chiakariga", "Nkondi"]
      },
      "Trans-Nzoia": {
        "Cherangany": ["Sinyerere", "Makutano", "Kaplamai", "Motosiet", "Cherangany/Suwerwa", "Chepsiro/Kiptoror", "Sitatunga"],
        "Endebess": ["Endebess", "Chepchoina", "Matumbei"],
        "Kiminini": ["Kiminini", "Waitaluk", "Sirende", "Hospital", "Sikhendu", "Nabiswa"],
        "Kwanza": ["Kapomboi", "Kwanza", "Keiyo", "Bidii"],
        "Saboti": ["Kinyoro", "Matisi", "Tuwani", "Saboti", "Machewa"]
      },
      "Turkana": {
        "Loima": ["Turkwel", "Loima", "Kotaruk/Lobei", "Lorengippi"],
        "Turkana Central": ["Kerio Delta", "Kangatotha", "Kalokol", "Lodwar Township", "Kanamkemer"],
        "Turkana East": ["Katilia", "Lokori/Kochodin", "Kapedo/Napeitom"],
        "Turkana North": ["Kaeris", "Lake Zone", "Lapur", "Kaaleng/Kaikor", "Kibish", "Nakalale"],
        "Turkana South": ["Kakuma", "Lopur", "Letea", "Songot", "Kalobeyei", "Lokichoggio", "Nanaam"],
        "Turkana West": ["Kakuma", "Lopur", "Songot", "Letea", "Lokichoggio", "Nanaam"]
      },
      "Uasin Gishu": {
        "Ainabkoi": ["Ainabkoi/Olare", "Kaptagat", "Kapsoya"],
        "Kapseret": ["Simat/Kapseret", "Kipkenyo", "Ngeria", "Megun", "Langas"],
        "Kesses": ["Racecourse", "Cheptiret/Kipchamo", "Tulwet/Chuiyat", "Tarakwa"],
        "Moiben": ["Tembelio", "Sergoit", "Karuna/Meibeki", "Moiben", "Kimumu"],
        "Soy": ["Mois Bridge", "Kapkures", "Ziwa", "Segero/Barsombe", "Kipsomba", "Soy", "Kuinet/Kapsuswa"],
        "Turbo": ["Tapsagoi", "Kamagut", "Kiplombe", "Kapsaos", "Huruma", "Ngenyilel"]
      },
      "Vihiga": {
        "Emuhaya": ["East Bunyore", "North Bunyore", "Central Bunyore", "West Bunyore"],
        "Hamisi": ["Shiru", "Gisambai", "Shamakhokho", "Banja", "Muhudu", "Jepkoyai", "Tambua"],
        "Luanda": ["Luanda Township", "Wemilabi", "Mwibona", "Luanda South", "Emabungo"],
        "Sabatia": ["Busali", "Chavakali", "West Sabatia", "North Maragoli", "Wodanga", "Lyaduywa/Izava"],
        "Vihiga": ["West Bunyore", "Lugaga-Wamuluma", "Central Maragoli", "South Maragoli"]
      },
      "Wajir": {
        "Eldas": ["Eldas", "Della", "Lakoley South/Basir", "Elnur/Tula Tula"],
        "Tarbaj": ["Tarbaj", "Wargadud", "Sarman", "Elben"],
        "Wajir East": ["Township", "Wagberi", "Khorof/Harar"],
        "Wajir North": ["Gurar", "Bute", "Korondille", "Malkagufu", "Batalu", "Danaba"],
        "Wajir South": ["Benane", "Burder", "Dadaab", "Habasswein", "Lagdera", "Ibrahim Ure", "Diif"],
        "Wajir West": ["Arbajahan", "Hadado/Athibohol", "Ademasajide", "Griftu"]
      },
      "West Pokot": {
        "Kapenguria": ["Riwo", "Kapenguria", "Mnagei", "Siyoi", "Endugh", "Sook"],
        "Kacheliba": ["Kacheliba", "Kongelai", "Alale", "Kasei", "Suam"],
        "Pokot South": ["Batei", "Lelan", "Tapach", "Chepareria", "Sook"],
        "Sigor": ["Sekerr", "Masool", "Lomut", "Weiwei"]
      }
    }
  },

  Tanzania: {
    name: "Tanzania",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Ward",
    divisions: {
      "Arusha": { "Arusha City": [], "Arusha District": [], "Karatu": [], "Longido": [], "Meru": [], "Monduli": [], "Ngorongoro": [] },
      "Dar es Salaam": { "Ilala": [], "Kinondoni": [], "Temeke": [], "Ubungo": [], "Kigamboni": [] },
      "Dodoma": { "Bahi": [], "Chamwino": [], "Chemba": [], "Dodoma": [], "Kondoa": [], "Kongwa": [], "Mpwapwa": [] },
      "Geita": { "Bukombe": [], "Chato": [], "Geita": [], "Mbogwe": [], "Nyang'hwale": [] },
      "Iringa": { "Iringa": [], "Iringa District": [], "Kilolo": [], "Mufindi": [] },
      "Kagera": { "Biharamulo": [], "Bukoba": [], "Bukoba District": [], "Karagwe": [], "Kyerwa": [], "Missenyi": [], "Muleba": [], "Ngara": [] },
      "Katavi": { "Mlele": [], "Mpanda": [], "Mpanda Town": [] },
      "Kigoma": { "Buhigwe": [], "Kasulu": [], "Kasulu Town": [], "Kibondo": [], "Kigoma": [], "Kigoma-Ujiji": [], "Kakonko": [], "Uvinza": [] },
      "Kilimanjaro": { "Hai": [], "Moshi": [], "Moshi District": [], "Mwanga": [], "Rombo": [], "Same": [], "Siha": [] },
      "Lindi": { "Kilwa": [], "Lindi": [], "Lindi District": [], "Liwale": [], "Nachingwea": [], "Ruangwa": [] },
      "Manyara": { "Babati": [], "Babati Town": [], "Hanang": [], "Kiteto": [], "Mbulu": [], "Simanjiro": [] },
      "Mara": { "Bunda": [], "Butiama": [], "Musoma": [], "Musoma District": [], "Rorya": [], "Serengeti": [], "Tarime": [] },
      "Mbeya": { "Busokelo": [], "Chunya": [], "Mbarali": [], "Mbeya City": [], "Mbeya District": [], "Rungwe": [] },
      "Morogoro": { "Gairo": [], "Kilombero": [], "Kilosa": [], "Morogoro": [], "Morogoro District": [], "Mvomero": [], "Ulanga": [], "Malinyi": [] },
      "Mtwara": { "Masasi": [], "Masasi Town": [], "Mtwara": [], "Mtwara District": [], "Nanyumbu": [], "Newala": [], "Tandahimba": [] },
      "Mwanza": { "Ilemela": [], "Kwimba": [], "Magu": [], "Misungwi": [], "Nyamagana": [], "Sengerema": [], "Ukerewe": [], "Buchosa": [] },
      "Njombe": { "Ludewa": [], "Makambako": [], "Makete": [], "Njombe": [], "Njombe Town": [], "Wanging'ombe": [] },
      "Pwani": { "Bagamoyo": [], "Kibaha": [], "Kibaha Town": [], "Kisarawe": [], "Mafia": [], "Mkuranga": [], "Rufiji": [] },
      "Rukwa": { "Kalambo": [], "Nkasi": [], "Sumbawanga": [], "Sumbawanga District": [] },
      "Ruvuma": { "Mbinga": [], "Namtumbo": [], "Nyasa": [], "Songea": [], "Songea District": [], "Tunduru": [] },
      "Shinyanga": { "Kahama": [], "Kahama Town": [], "Kishapu": [], "Shinyanga": [], "Shinyanga District": [] },
      "Simiyu": { "Bariadi": [], "Busega": [], "Itilima": [], "Maswa": [], "Meatu": [] },
      "Singida": { "Ikungi": [], "Iramba": [], "Manyoni": [], "Mkalama": [], "Singida": [], "Singida District": [] },
      "Songwe": { "Ileje": [], "Mbozi": [], "Momba": [], "Songwe": [] },
      "Tabora": { "Igunga": [], "Kaliua": [], "Nzega": [], "Sikonge": [], "Tabora": [], "Urambo": [], "Uyui": [] },
      "Tanga": { "Handeni": [], "Handeni Town": [], "Kilindi": [], "Korogwe": [], "Korogwe Town": [], "Lushoto": [], "Mkinga": [], "Muheza": [], "Pangani": [], "Tanga City": [] }
    }
  },

  Uganda: {
    name: "Uganda",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Sub-county",
    divisions: {
      "Central": { "Kampala": [], "Wakiso": [], "Mukono": [], "Mpigi": [], "Masaka": [], "Luwero": [], "Kayunga": [], "Buikwe": [], "Mityana": [], "Nakaseke": [], "Rakai": [], "Sembabule": [], "Kalungu": [], "Lwengo": [], "Lyantonde": [], "Bukomansimbi": [], "Butambala": [], "Gomba": [], "Kalangala": [], "Kiboga": [], "Kyankwanzi": [], "Nakasongola": [], "Mubende": [], "Kassanda": [], "Kyotera": [] },
      "Eastern": { "Jinja": [], "Mbale": [], "Soroti": [], "Tororo": [], "Iganga": [], "Bugiri": [], "Kamuli": [], "Busia": [], "Pallisa": [], "Kumi": [], "Sironko": [], "Kapchorwa": [], "Budaka": [], "Bududa": [], "Bukedea": [], "Bukwo": [], "Bulambuli": [], "Buyende": [], "Kaliro": [], "Kibuku": [], "Luuka": [], "Manafwa": [], "Namayingo": [], "Namutumba": [], "Ngora": [], "Serere": [] },
      "Northern": { "Gulu": [], "Lira": [], "Arua": [], "Kitgum": [], "Pader": [], "Apac": [], "Moroto": [], "Adjumani": [], "Moyo": [], "Nebbi": [], "Kotido": [], "Kaabong": [], "Abim": [], "Agago": [], "Alebtong": [], "Amolatar": [], "Amudat": [], "Amuria": [], "Amuru": [], "Dokolo": [], "Kole": [], "Lamwo": [], "Napak": [], "Nwoya": [], "Otuke": [], "Oyam": [], "Zombo": [], "Koboko": [], "Maracha": [], "Yumbe": [] },
      "Western": { "Mbarara": [], "Kabale": [], "Fort Portal": [], "Kasese": [], "Bushenyi": [], "Hoima": [], "Masindi": [], "Rukungiri": [], "Ntungamo": [], "Kanungu": [], "Kisoro": [], "Ibanda": [], "Isingiro": [], "Kamwenge": [], "Kiruhura": [], "Kyegegwa": [], "Kyenjojo": [], "Mitooma": [], "Rubirizi": [], "Sheema": [], "Buhweju": [], "Buliisa": [], "Bundibugyo": [], "Kagadi": [], "Kakumiro": [], "Kibaale": [], "Kiryandongo": [], "Rubanda": [], "Rukiga": [] }
    }
  },

  Ethiopia: {
    name: "Ethiopia",
    level1Label: "Region",
    level2Label: "Zone",
    level3Label: "Woreda",
    divisions: {
      "Addis Ababa": { "Addis Ketema": [], "Akaky Kaliti": [], "Arada": [], "Bole": [], "Gulele": [], "Kirkos": [], "Kolfe Keranio": [], "Lideta": [], "Nifas Silk-Lafto": [], "Yeka": [], "Lemi Kura": [] },
      "Afar": { "Zone 1 (Awsi Rasu)": [], "Zone 2 (Kilbet Rasu)": [], "Zone 3 (Gabi Rasu)": [], "Zone 4 (Fantena Rasu)": [], "Zone 5 (Hari Rasu)": [] },
      "Amhara": { "North Gondar": [], "South Gondar": [], "North Wollo": [], "South Wollo": [], "East Gojjam": [], "West Gojjam": [], "North Shewa": [], "Oromia": [], "Wag Hemra": [], "Awi": [] },
      "Benishangul-Gumuz": { "Asosa": [], "Kamashi": [], "Metekel": [] },
      "Dire Dawa": { "Dire Dawa": [] },
      "Gambela": { "Anuak": [], "Nuer": [], "Majang": [] },
      "Harari": { "Harari": [] },
      "Oromia": { "Arsi": [], "Bale": [], "Borena": [], "East Hararghe": [], "East Shewa": [], "East Wellega": [], "Guji": [], "Horo Guduru Wellega": [], "Illubabor": [], "Jimma": [], "Kelam Wellega": [], "North Shewa": [], "South West Shewa": [], "West Arsi": [], "West Guji": [], "West Hararghe": [], "West Shewa": [], "West Wellega": [] },
      "Sidama": { "Sidama": [] },
      "Somali": { "Afder": [], "Degehabur": [], "Fafan": [], "Jarar": [], "Korahe": [], "Liben": [], "Nogob": [], "Shabelle": [], "Sitti": [] },
      "South West Ethiopia": { "Bench Sheko": [], "Dawro": [], "Kefa": [], "Sheka": [], "West Omo": [] },
      "SNNPR": { "Gedeo": [], "Gurage": [], "Hadiya": [], "Kembata Tembaro": [], "Sidama": [], "Silte": [], "Wolayita": [], "Gamo Gofa": [], "South Omo": [] },
      "Tigray": { "Central Tigray": [], "Eastern Tigray": [], "North Western Tigray": [], "Southern Tigray": [], "Western Tigray": [], "Mekelle": [] }
    }
  },

  Somalia: {
    name: "Somalia",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Sub-district",
    divisions: {
      "Banadir": { "Mogadishu": [] },
      "Awdal": { "Borama": [], "Baki": [], "Lughaye": [], "Zeila": [] },
      "Bakool": { "Hudur": [], "Tieglow": [], "Wajid": [], "Elbarde": [], "Rabdure": [] },
      "Bay": { "Baidoa": [], "Buur Hakaba": [], "Diinsoor": [], "Qansax Dheere": [] },
      "Galgaduud": { "Dhuusamarreeb": [], "Adado": [], "El Buur": [], "El Dher": [], "Abudwak": [] },
      "Gedo": { "Garbahaarey": [], "Balet Xaawo": [], "Bardhere": [], "Burdhubo": [], "Dollow": [], "Luuq": [] },
      "Hiiraan": { "Beledweyne": [], "Bulo Burto": [], "Jalalaqsi": [], "Mataban": [] },
      "Jubbada Dhexe": { "Bu'aale": [], "Jilib": [], "Saakow": [] },
      "Jubbada Hoose": { "Kismayo": [], "Afmadow": [], "Badhaadhe": [], "Jamaame": [] },
      "Mudug": { "Gaalkacyo": [], "Hobyo": [], "Jariiban": [], "Xarardheere": [], "Goldogob": [] },
      "Nugaal": { "Garoowe": [], "Burtinle": [], "Eyl": [], "Dangorayo": [] },
      "Sanaag": { "Erigavo": [], "Ceel Afweyn": [], "Las Qoray": [], "Ceerigaabo": [] },
      "Shabelle Dhexe": { "Jowhar": [], "Aden Yabal": [], "Balcad": [], "Warsheikh": [], "Mahaday": [] },
      "Shabelle Hoose": { "Marka": [], "Afgooye": [], "Baraawe": [], "Qoryooley": [], "Wanla Weyn": [], "Kurtunwaarey": [] },
      "Sool": { "Las Anod": [], "Ainabo": [], "Taleex": [], "Buuhoodle": [] },
      "Togdheer": { "Burao": [], "Odweyne": [], "Sheikh": [], "Berbera": [] },
      "Woqooyi Galbeed": { "Hargeisa": [], "Gebiley": [], "Wajaale": [] }
    }
  },

  Rwanda: {
    name: "Rwanda",
    level1Label: "Province",
    level2Label: "District",
    level3Label: "Sector",
    divisions: {
      "Kigali City": { "Gasabo": [], "Kicukiro": [], "Nyarugenge": [] },
      "Eastern Province": { "Bugesera": [], "Gatsibo": [], "Kayonza": [], "Kirehe": [], "Ngoma": [], "Nyagatare": [], "Rwamagana": [] },
      "Northern Province": { "Burera": [], "Gakenke": [], "Gicumbi": [], "Musanze": [], "Rulindo": [] },
      "Southern Province": { "Gisagara": [], "Huye": [], "Kamonyi": [], "Muhanga": [], "Nyamagabe": [], "Nyanza": [], "Nyaruguru": [], "Ruhango": [] },
      "Western Province": { "Karongi": [], "Ngororero": [], "Nyabihu": [], "Nyamasheke": [], "Rubavu": [], "Rusizi": [], "Rutsiro": [] }
    }
  },

  Burundi: {
    name: "Burundi",
    level1Label: "Province",
    level2Label: "Commune",
    level3Label: "Colline",
    divisions: {
      "Bubanza": { "Bubanza": [], "Gihanga": [], "Mpanda": [], "Musigati": [], "Rugazi": [] },
      "Bujumbura Mairie": { "Muha": [], "Mukaza": [], "Ntahangwa": [] },
      "Bujumbura Rural": { "Isale": [], "Kabezi": [], "Kanyosha": [], "Mubimbi": [], "Mugongomanga": [], "Mukike": [], "Mutambu": [], "Mutimbuzi": [], "Nyabiraba": [] },
      "Bururi": { "Bururi": [], "Matana": [], "Mugamba": [], "Rutovu": [], "Songa": [], "Vyanda": [] },
      "Cankuzo": { "Cankuzo": [], "Cendajuru": [], "Gisagara": [], "Kigamba": [], "Mishiha": [] },
      "Cibitoke": { "Buganda": [], "Bukinanyana": [], "Mabayi": [], "Mugina": [], "Murwi": [] },
      "Gitega": { "Bugendana": [], "Bukirasazi": [], "Buraza": [], "Giheta": [], "Gishubi": [], "Gitega": [], "Itaba": [], "Makebuko": [], "Mutaho": [], "Nyanrusange": [], "Ryansoro": [] },
      "Karuzi": { "Bugenyuzi": [], "Buhiga": [], "Gihogazi": [], "Gitaramuka": [], "Mutumba": [], "Nyabikere": [], "Shombo": [] },
      "Kayanza": { "Butaganzwa": [], "Gahombo": [], "Gatara": [], "Kabarore": [], "Kayanza": [], "Matongo": [], "Muhanga": [], "Rango": [] },
      "Kirundo": { "Bugabira": [], "Busoni": [], "Bwambarangwe": [], "Gitobe": [], "Kirundo": [], "Ntega": [], "Vumbi": [] },
      "Makamba": { "Kayogoro": [], "Kibago": [], "Mabanda": [], "Makamba": [], "Nyanza-Lac": [], "Vugizo": [] },
      "Muramvya": { "Bukeye": [], "Kiganda": [], "Mbuye": [], "Muramvya": [], "Rutegama": [] },
      "Muyinga": { "Buhinyuza": [], "Butihinda": [], "Gashoho": [], "Gasorwe": [], "Giteranyi": [], "Muyinga": [], "Mwakiro": [] },
      "Mwaro": { "Bisoro": [], "Fota": [], "Gisozi": [], "Kayokwe": [], "Ndava": [], "Nyabihanga": [] },
      "Ngozi": { "Busiga": [], "Gashikanwa": [], "Kiremba": [], "Marangara": [], "Mwumba": [], "Ngozi": [], "Nyamurenza": [], "Tangara": [], "Ruhororo": [] },
      "Rumonge": { "Bugarama": [], "Burambi": [], "Buyengero": [], "Muhuta": [], "Rumonge": [] },
      "Rutana": { "Bukemba": [], "Giharo": [], "Gitanga": [], "Mpinga-Kayove": [], "Musongati": [], "Rutana": [] },
      "Ruyigi": { "Butaganzwa": [], "Butezi": [], "Bweru": [], "Gisuru": [], "Kinyinya": [], "Nyabitsinda": [], "Ruyigi": [] }
    }
  },

  "South Sudan": {
    name: "South Sudan",
    level1Label: "State",
    level2Label: "County",
    level3Label: "Payam",
    divisions: {
      "Central Equatoria": { "Juba": [], "Kajo-keji": [], "Lainya": [], "Morobo": [], "Terekeka": [], "Yei": [] },
      "Eastern Equatoria": { "Budi": [], "Ikotos": [], "Kapoeta East": [], "Kapoeta North": [], "Kapoeta South": [], "Lafon": [], "Magwi": [], "Torit": [] },
      "Jonglei": { "Akobo": [], "Ayod": [], "Bor South": [], "Canal/Pigi": [], "Duk": [], "Fangak": [], "Nyirol": [], "Pibor": [], "Pochalla": [], "Twic East": [], "Uror": [] },
      "Lakes": { "Awerial": [], "Cueibet": [], "Rumbek Centre": [], "Rumbek East": [], "Rumbek North": [], "Wulu": [], "Yirol East": [], "Yirol West": [] },
      "Northern Bahr el Ghazal": { "Aweil Centre": [], "Aweil East": [], "Aweil North": [], "Aweil South": [], "Aweil West": [] },
      "Unity": { "Guit": [], "Koch": [], "Leer": [], "Mayendit": [], "Mayom": [], "Panyijiar": [], "Pariang": [], "Rubkona": [] },
      "Upper Nile": { "Baliet": [], "Fashoda": [], "Longochuk": [], "Luakpiny/Nasir": [], "Maiwut": [], "Maban": [], "Malakal": [], "Manyo": [], "Panyikang": [], "Renk": [], "Ulang": [] },
      "Warrap": { "Gogrial East": [], "Gogrial West": [], "Tonj East": [], "Tonj North": [], "Tonj South": [], "Twic": [] },
      "Western Bahr el Ghazal": { "Jur River": [], "Raga": [], "Wau": [] },
      "Western Equatoria": { "Ezo": [], "Ibba": [], "Maridi": [], "Mundri East": [], "Mundri West": [], "Mvolo": [], "Nagero": [], "Nzara": [], "Tambura": [], "Yambio": [] }
    }
  },

  Sudan: {
    name: "Sudan",
    level1Label: "State",
    level2Label: "Locality",
    level3Label: "Administrative Unit",
    divisions: {
      "Khartoum": { "Khartoum": [], "Omdurman": [], "Bahri": [], "Jabal Awliya": [], "Sharg An Nil": [], "Karari": [], "Umbadda": [] },
      "Al Jazirah": { "Wad Madani": [], "Al Hasahisa": [], "Al Managil": [], "Al Kamlin": [] },
      "Blue Nile": { "Ad Damazin": [], "Ar Roseires": [], "Baw": [] },
      "Central Darfur": { "Zalingei": [], "Azum": [], "Mukjar": [], "Wadi Salih": [] },
      "East Darfur": { "Ad Du'ayn": [], "Adila": [], "Assalaya": [], "Bahr al Arab": [], "Yassin": [] },
      "Gedaref": { "Gedaref": [], "Al Faw": [], "Al Fashaga": [], "Gallabat": [] },
      "Kassala": { "Kassala": [], "Halfa": [], "Hamashkoreib": [], "Telkok": [] },
      "North Darfur": { "Al Fashir": [], "Kutum": [], "Kabkabiya": [], "Al Lait": [], "Dar es Salam": [], "Malha": [], "Saraf Omra": [], "Tawila": [] },
      "North Kordofan": { "El Obeid": [], "Bara": [], "Sheikan": [], "Sodari": [], "Um Rawaba": [] },
      "Northern": { "Dongola": [], "Halfa": [], "Merowe": [], "Al Dabbah": [] },
      "Red Sea": { "Port Sudan": [], "Sawakin": [], "Tokar": [], "Halaib": [], "Sinkat": [] },
      "River Nile": { "Atbara": [], "Ad Damer": [], "Shendi": [], "Barbar": [], "Abu Hamad": [] },
      "Sennar": { "Singa": [], "Sennar": [], "Abu Hujar": [] },
      "South Darfur": { "Nyala": [], "Kass": [], "Mershing": [], "Ed Daein": [], "Buram": [], "Rehed Al Birdi": [], "Tulus": [] },
      "South Kordofan": { "Kadugli": [], "Abu Jubaiha": [], "Dilling": [], "Rashad": [], "Talodi": [] },
      "West Darfur": { "El Geneina": [], "Beida": [], "Habila": [], "Kulbus": [] },
      "West Kordofan": { "Al Fula": [], "An Nuhud": [], "Al Sunut": [], "Abyei": [], "Lagawa": [] },
      "White Nile": { "Kosti": [], "Rabak": [], "Ed Dueim": [], "Tendalti": [], "Jabalain": [] }
    }
  },

  Djibouti: {
    name: "Djibouti",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Commune",
    divisions: {
      "Djibouti": { "Djibouti Ville": [], "Ras Dika": [], "Boulaos": [] },
      "Ali Sabieh": { "Ali Sabieh": [], "Ali Adde": [] },
      "Arta": { "Arta": [], "Wea": [] },
      "Dikhil": { "Dikhil": [], "As-Eyla": [], "Mouloud": [] },
      "Obock": { "Obock": [], "Alailou": [] },
      "Tadjourah": { "Tadjourah": [], "Randa": [], "Airolaf": [] }
    }
  },

  Madagascar: {
    name: "Madagascar",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Commune",
    divisions: {
      "Analamanga": { "Antananarivo-Renivohitra": [], "Antananarivo-Atsimondrano": [], "Antananarivo-Avaradrano": [], "Ambohidratrimo": [], "Ankazobe": [], "Anjozorobe": [], "Manjakandriana": [] },
      "Vakinankaratra": { "Antsirabe I": [], "Antsirabe II": [], "Ambatolampy": [], "Antanifotsy": [], "Betafo": [], "Faratsiho": [], "Mandoto": [] },
      "Itasy": { "Miarinarivo": [], "Arivonimamo": [], "Soavinandriana": [] },
      "Bongolava": { "Tsiroanomandidy": [], "Fenoarivobe": [] },
      "Diana": { "Antsiranana I": [], "Antsiranana II": [], "Ambanja": [], "Ambilobe": [], "Nosy-Be": [] },
      "Sava": { "Sambava": [], "Antsirabe Nord": [], "Antalaha": [], "Vohémar": [] },
      "Sofia": { "Antsohihy": [], "Analalava": [], "Bealanana": [], "Befandriana Nord": [], "Mampikony": [], "Mandritsara": [], "Port-Bergé": [] },
      "Boeny": { "Mahajanga I": [], "Mahajanga II": [], "Ambato-Boeni": [], "Marovoay": [], "Mitsinjo": [], "Soalala": [] },
      "Betsiboka": { "Maevatanana": [], "Kandreho": [], "Tsaratanana": [] },
      "Melaky": { "Maintirano": [], "Ambatomainty": [], "Antsalova": [], "Besalampy": [], "Morafenobe": [] },
      "Alaotra-Mangoro": { "Ambatondrazaka": [], "Amparafaravola": [], "Andilamena": [], "Anosibe An'ala": [], "Moramanga": [] },
      "Analanjirofo": { "Fénérive Est": [], "Mananara Nord": [], "Maroantsetra": [], "Nosy Boraha": [], "Soanierana Ivongo": [], "Vavatenina": [] },
      "Atsinanana": { "Toamasina I": [], "Toamasina II": [], "Brickaville": [], "Mahanoro": [], "Marolambo": [], "Vatomandry": [] },
      "Vatovavy": { "Mananjary": [], "Ifanadiana": [], "Nosy Varika": [] },
      "Fitovinany": { "Manakara": [], "Ikongo": [], "Vohipeno": [] },
      "Haute Matsiatra": { "Fianarantsoa I": [], "Ambalavao": [], "Ambohimahasoa": [], "Ikalamavony": [], "Lalangina": [], "Vohibato": [] },
      "Amoron'i Mania": { "Ambositra": [], "Ambatofinandrahana": [], "Fandriana": [], "Manandriana": [] },
      "Ihorombe": { "Ihosy": [], "Iakora": [], "Ivohibe": [] },
      "Atsimo-Atsinanana": { "Farafangana": [], "Befotaka": [], "Midongy-Atsimo": [], "Vangaindrano": [], "Vondrozo": [] },
      "Anosy": { "Tôlanaro": [], "Amboasary": [], "Betroka": [] },
      "Androy": { "Ambovombe": [], "Bekily": [], "Tsihombe": [] },
      "Menabe": { "Morondava": [], "Belo sur Tsiribihina": [], "Mahabo": [], "Manja": [], "Miandrivazo": [] },
      "Atsimo-Andrefana": { "Toliara I": [], "Toliara II": [], "Ampanihy": [], "Ankazoabo": [], "Benenitra": [], "Betioky": [], "Morombe": [], "Sakaraha": [] }
    }
  },

  Nigeria: {
    name: "Nigeria",
    level1Label: "State",
    level2Label: "LGA",
    level3Label: "Ward",
    divisions: {
      "Abia": { "Aba North": [], "Aba South": [], "Arochukwu": [], "Bende": [], "Ikwuano": [], "Isiala Ngwa North": [], "Isiala Ngwa South": [], "Isuikwuato": [], "Obi Ngwa": [], "Ohafia": [], "Osisioma Ngwa": [], "Ugwunagbo": [], "Ukwa East": [], "Ukwa West": [], "Umuahia North": [], "Umuahia South": [], "Umu Nneochi": [] },
      "Adamawa": { "Demsa": [], "Fufore": [], "Ganye": [], "Girei": [], "Gombi": [], "Guyuk": [], "Hong": [], "Jada": [], "Lamurde": [], "Madagali": [], "Maiha": [], "Mayo-Belwa": [], "Michika": [], "Mubi North": [], "Mubi South": [], "Numan": [], "Shelleng": [], "Song": [], "Toungo": [], "Yola North": [], "Yola South": [] },
      "FCT Abuja": { "Abaji": [], "Abuja Municipal": [], "Bwari": [], "Gwagwalada": [], "Kuje": [], "Kwali": [] },
      "Lagos": { "Agege": [], "Ajeromi-Ifelodun": [], "Alimosho": [], "Amuwo-Odofin": [], "Apapa": [], "Badagry": [], "Epe": [], "Eti-Osa": [], "Ibeju-Lekki": [], "Ifako-Ijaiye": [], "Ikeja": [], "Ikorodu": [], "Kosofe": [], "Lagos Island": [], "Lagos Mainland": [], "Mushin": [], "Ojo": [], "Oshodi-Isolo": [], "Shomolu": [], "Surulere": [] },
      "Kano": { "Ajingi": [], "Albasu": [], "Bagwai": [], "Bebeji": [], "Bichi": [], "Bunkure": [], "Dala": [], "Dambatta": [], "Dawakin Kudu": [], "Dawakin Tofa": [], "Doguwa": [], "Fagge": [], "Gabasawa": [], "Garko": [], "Garun Mallam": [], "Gaya": [], "Gezawa": [], "Gwale": [], "Gwarzo": [], "Kabo": [], "Kano Municipal": [], "Karaye": [], "Kibiya": [], "Kiru": [], "Kumbotso": [], "Kunchi": [], "Kura": [], "Madobi": [], "Makoda": [], "Minjibir": [], "Nasarawa": [], "Rano": [], "Rimin Gado": [], "Rogo": [], "Shanono": [], "Sumaila": [], "Takai": [], "Tarauni": [], "Tofa": [], "Tsanyawa": [], "Tudun Wada": [], "Ungogo": [], "Warawa": [], "Wudil": [] },
      "Rivers": { "Abua/Odual": [], "Ahoada East": [], "Ahoada West": [], "Akuku-Toru": [], "Andoni": [], "Asari-Toru": [], "Bonny": [], "Degema": [], "Eleme": [], "Emohua": [], "Etche": [], "Gokana": [], "Ikwerre": [], "Khana": [], "Obio/Akpor": [], "Ogba/Egbema/Ndoni": [], "Ogu/Bolo": [], "Okrika": [], "Omuma": [], "Opobo/Nkoro": [], "Oyigbo": [], "Port Harcourt": [], "Tai": [] },
      "Oyo": { "Afijio": [], "Akinyele": [], "Atiba": [], "Atisbo": [], "Egbeda": [], "Ibadan North": [], "Ibadan North-East": [], "Ibadan North-West": [], "Ibadan South-East": [], "Ibadan South-West": [], "Ibarapa Central": [], "Ibarapa East": [], "Ibarapa North": [], "Ido": [], "Irepo": [], "Iseyin": [], "Itesiwaju": [], "Iwajowa": [], "Kajola": [], "Lagelu": [], "Ogbomosho North": [], "Ogbomosho South": [], "Ogo Oluwa": [], "Oluyole": [], "Ona Ara": [], "Orelope": [], "Ori Ire": [], "Oyo East": [], "Oyo West": [], "Saki East": [], "Saki West": [], "Surulere": [] },
      "Kaduna": { "Birnin Gwari": [], "Chikun": [], "Giwa": [], "Igabi": [], "Ikara": [], "Jaba": [], "Jema'a": [], "Kachia": [], "Kaduna North": [], "Kaduna South": [], "Kagarko": [], "Kajuru": [], "Kaura": [], "Kauru": [], "Kubau": [], "Kudan": [], "Lere": [], "Makarfi": [], "Sabon Gari": [], "Sanga": [], "Soba": [], "Zangon Kataf": [], "Zaria": [] }
    }
  },

  Ghana: {
    name: "Ghana",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Constituency",
    divisions: {
      "Greater Accra": { "Accra Metropolitan": [], "Tema Metropolitan": [], "Ga East": [], "Ga West": [], "Ga South": [], "Ga Central": [], "La Dade Kotopon": [], "La Nkwantanang Madina": [], "Ledzokuku": [], "Kpone Katamanso": [], "Adentan": [], "Ashaiman": [], "Ada East": [], "Ada West": [], "Ningo Prampram": [], "Shai Osudoku": [] },
      "Ashanti": { "Kumasi Metropolitan": [], "Obuasi": [], "Ejisu": [], "Bekwai": [], "Mampong": [], "Offinso North": [], "Offinso South": [], "Atwima Nwabiagya": [], "Atwima Kwanwoma": [], "Atwima Mponua": [], "Bosomtwe": [], "Asante Akim North": [], "Asante Akim South": [], "Asante Akim Central": [], "Sekyere East": [], "Sekyere South": [], "Sekyere Central": [], "Sekyere Kumawu": [], "Sekyere Afram Plains": [], "Adansi North": [], "Adansi South": [], "Amansie Central": [], "Amansie West": [], "Amansie South": [], "Obuasi East": [], "Afigya Kwabre North": [], "Afigya Kwabre South": [], "Ahafo Ano North": [], "Ahafo Ano South East": [], "Ahafo Ano South West": [], "Old Tafo": [], "Suame": [], "Kwadaso": [], "Nhyiaeso": [], "Bantama": [], "Manhyia North": [], "Manhyia South": [], "Asokwa": [], "Oforikrom": [], "Asokore Mampong": [] },
      "Central": { "Cape Coast Metropolitan": [], "Agona East": [], "Agona West": [], "Ajumako-Enyan-Essiam": [], "Asikuma Odoben Brakwa": [], "Assin North": [], "Assin South": [], "Awutu Senya East": [], "Awutu Senya West": [], "Effutu": [], "Ekumfi": [], "Gomoa East": [], "Gomoa West": [], "Komenda Edina Eguafo Abrem": [], "Mfantsiman": [], "Twifo Atti Morkwa": [], "Twifo Hemang Lower Denkyira": [], "Upper Denkyira East": [], "Upper Denkyira West": [] },
      "Eastern": { "New Juaben South": [], "New Juaben North": [], "Abuakwa North": [], "Abuakwa South": [], "Atiwa East": [], "Atiwa West": [], "Akuapem North": [], "Akuapem South": [], "Akyemansa": [], "Birim Central": [], "Birim North": [], "Birim South": [], "Denkyembour": [], "Fanteakwa North": [], "Fanteakwa South": [], "Kwaebibirem": [], "Kwahu Afram Plains North": [], "Kwahu Afram Plains South": [], "Kwahu East": [], "Kwahu South": [], "Kwahu West": [], "Lower Manya Krobo": [], "Nsawam Adoagyiri": [], "Okere": [], "Suhum": [], "Upper Manya Krobo": [], "Upper West Akim": [], "West Akim": [], "Yilo Krobo": [], "Ayensuano": [] },
      "Western": { "Sekondi-Takoradi": [], "Ahanta West": [], "Effia-Kwesimintsim": [], "Ellembelle": [], "Jomoro": [], "Mpohor": [], "Nzema East": [], "Prestea-Huni Valley": [], "Shama": [], "Tarkwa-Nsuaem": [], "Wasa Amenfi Central": [], "Wasa Amenfi East": [], "Wasa Amenfi West": [] },
      "Western North": { "Aowin": [], "Bia East": [], "Bia West": [], "Bodi": [], "Juaboso": [], "Sefwi Akontombra": [], "Sefwi Wiawso": [], "Suaman": [], "Bibiani Anhwiaso Bekwai": [] },
      "Volta": { "Ho": [], "Adaklu": [], "Agortime-Ziope": [], "Akatsi North": [], "Akatsi South": [], "Anloga": [], "Central Tongu": [], "Ho West": [], "Hohoe": [], "Keta": [], "Ketu North": [], "Ketu South": [], "North Dayi": [], "North Tongu": [], "South Dayi": [], "South Tongu": [], "Afadzato South": [] },
      "Oti": { "Biakoye": [], "Jasikan": [], "Kadjebi": [], "Krachi East": [], "Krachi Nchumuru": [], "Krachi West": [], "Nkwanta North": [], "Nkwanta South": [] },
      "Northern": { "Tamale Metropolitan": [], "Kpandai": [], "Mion": [], "Nanton": [], "Saboba": [], "Sagnarigu": [], "Savelugu": [], "Tatale Sanguli": [], "Tolon": [], "Yendi": [], "Zabzugu": [], "Gushegu": [], "Karaga": [] },
      "Savannah": { "Bole": [], "Central Gonja": [], "East Gonja": [], "North East Gonja": [], "North Gonja": [], "Sawla-Tuna-Kalba": [], "West Gonja": [] },
      "North East": { "Bunkpurugu-Nyankpanduri": [], "Chereponi": [], "East Mamprusi": [], "Mamprugu Moagduri": [], "West Mamprusi": [], "Yunyoo-Nasuan": [] },
      "Upper East": { "Bolgatanga": [], "Bawku": [], "Bawku West": [], "Binduri": [], "Bongo": [], "Builsa North": [], "Builsa South": [], "Garu": [], "Kassena-Nankana East": [], "Kassena-Nankana West": [], "Nabdam": [], "Pusiga": [], "Talensi": [], "Tempane": [] },
      "Upper West": { "Wa": [], "Daffiama-Bussie-Issa": [], "Jirapa": [], "Lambussie-Karni": [], "Lawra": [], "Nadowli-Kaleo": [], "Nandom": [], "Sissala East": [], "Sissala West": [], "Wa East": [], "Wa West": [] },
      "Ahafo": { "Asunafo North": [], "Asunafo South": [], "Asutifi North": [], "Asutifi South": [], "Tano North": [], "Tano South": [] },
      "Bono": { "Berekum East": [], "Berekum West": [], "Dormaa Central": [], "Dormaa East": [], "Dormaa West": [], "Jaman North": [], "Jaman South": [], "Sunyani": [], "Sunyani West": [], "Tain": [], "Wenchi": [] },
      "Bono East": { "Atebubu-Amantin": [], "Kintampo North": [], "Kintampo South": [], "Nkoranza North": [], "Nkoranza South": [], "Pru East": [], "Pru West": [], "Sene East": [], "Sene West": [], "Techiman": [], "Techiman North": [] }
    }
  },

  Senegal: {
    name: "Senegal",
    level1Label: "Region",
    level2Label: "Department",
    level3Label: "Arrondissement",
    divisions: {
      "Dakar": { "Dakar": [], "Guédiawaye": [], "Pikine": [], "Rufisque": [] },
      "Diourbel": { "Bambey": [], "Diourbel": [], "Mbacké": [] },
      "Fatick": { "Fatick": [], "Foundiougne": [], "Gossas": [] },
      "Kaffrine": { "Birkelane": [], "Kaffrine": [], "Koungheul": [], "Malem Hodar": [] },
      "Kaolack": { "Guinguinéo": [], "Kaolack": [], "Nioro du Rip": [] },
      "Kédougou": { "Kédougou": [], "Salémata": [], "Saraya": [] },
      "Kolda": { "Kolda": [], "Médina Yoro Foulah": [], "Vélingara": [] },
      "Louga": { "Kébémer": [], "Linguère": [], "Louga": [] },
      "Matam": { "Kanel": [], "Matam": [], "Ranérou Ferlo": [] },
      "Saint-Louis": { "Dagana": [], "Podor": [], "Saint-Louis": [] },
      "Sédhiou": { "Bounkiling": [], "Goudomp": [], "Sédhiou": [] },
      "Tambacounda": { "Bakel": [], "Goudiry": [], "Koumpentoum": [], "Tambacounda": [] },
      "Thiès": { "Mbour": [], "Thiès": [], "Tivaouane": [] },
      "Ziguinchor": { "Bignona": [], "Oussouye": [], "Ziguinchor": [] }
    }
  },

  "Sierra Leone": {
    name: "Sierra Leone",
    level1Label: "Province",
    level2Label: "District",
    level3Label: "Chiefdom",
    divisions: {
      "Eastern Province": { "Kailahun": [], "Kenema": [], "Kono": [] },
      "Northern Province": { "Bombali": [], "Falaba": [], "Koinadugu": [], "Tonkolili": [] },
      "North West Province": { "Kambia": [], "Karene": [], "Port Loko": [] },
      "Southern Province": { "Bo": [], "Bonthe": [], "Moyamba": [], "Pujehun": [] },
      "Western Area": { "Western Area Rural": [], "Western Area Urban": [] }
    }
  },

  "Côte d'Ivoire": {
    name: "Côte d'Ivoire",
    level1Label: "District",
    level2Label: "Region",
    level3Label: "Department",
    divisions: {
      "Abidjan": { "Abidjan": [], "Anyama": [], "Bingerville": [], "Grand-Bassam": [] },
      "Bas-Sassandra": { "Gbôklé": [], "Nawa": [], "San-Pédro": [] },
      "Comoé": { "Indénié-Djuablin": [], "Sud-Comoé": [] },
      "Denguélé": { "Folon": [], "Kabadougou": [] },
      "Gôh-Djiboua": { "Gôh": [], "Lôh-Djiboua": [] },
      "Lacs": { "Bélier": [], "Iffou": [], "Moronou": [], "N'zi": [] },
      "Lagunes": { "Agnéby-Tiassa": [], "Grands-Ponts": [], "La Mé": [] },
      "Montagnes": { "Cavally": [], "Guémon": [], "Tonkpi": [] },
      "Sassandra-Marahoué": { "Haut-Sassandra": [], "Marahoué": [] },
      "Savanes": { "Bagoué": [], "Poro": [], "Tchologo": [] },
      "Vallée du Bandama": { "Gbêkê": [], "Hambol": [] },
      "Woroba": { "Béré": [], "Bafing": [], "Worodougou": [] },
      "Yamoussoukro": { "Yamoussoukro": [] },
      "Zanzan": { "Bounkani": [], "Gontougo": [] }
    }
  },

  Benin: {
    name: "Benin",
    level1Label: "Department",
    level2Label: "Commune",
    level3Label: "Arrondissement",
    divisions: {
      "Alibori": { "Banikoara": [], "Gogounou": [], "Kandi": [], "Karimama": [], "Malanville": [], "Ségbana": [] },
      "Atacora": { "Boukoumbé": [], "Cobly": [], "Kérou": [], "Kouandé": [], "Matéri": [], "Natitingou": [], "Pehunco": [], "Tanguiéta": [], "Toucountouna": [] },
      "Atlantique": { "Abomey-Calavi": [], "Allada": [], "Kpomassè": [], "Ouidah": [], "Sô-Ava": [], "Toffo": [], "Tori-Bossito": [], "Zè": [] },
      "Borgou": { "Bembèrèkè": [], "Kalalé": [], "N'Dali": [], "Nikki": [], "Parakou": [], "Pèrèrè": [], "Sinendé": [], "Tchaourou": [] },
      "Collines": { "Bantè": [], "Dassa-Zoumè": [], "Glazoué": [], "Ouèssè": [], "Savalou": [], "Savè": [] },
      "Couffo": { "Aplahoué": [], "Djakotomey": [], "Dogbo": [], "Klouékanmey": [], "Lalo": [], "Toviklin": [] },
      "Donga": { "Bassila": [], "Copargo": [], "Djougou": [], "Ouaké": [] },
      "Littoral": { "Cotonou": [] },
      "Mono": { "Athiémé": [], "Bopa": [], "Comè": [], "Grand-Popo": [], "Houéyogbé": [], "Lokossa": [] },
      "Ouémé": { "Adjarra": [], "Adjohoun": [], "Aguégués": [], "Akpro-Missérété": [], "Avrankou": [], "Bonou": [], "Dangbo": [], "Porto-Novo": [], "Sèmè-Kpodji": [] },
      "Plateau": { "Adja-Ouèrè": [], "Ifangni": [], "Kétou": [], "Pobè": [], "Sakété": [] },
      "Zou": { "Abomey": [], "Agbangnizoun": [], "Bohicon": [], "Covè": [], "Djidja": [], "Ouinhi": [], "Za-Kpota": [], "Zagnanado": [], "Zogbodomey": [] }
    }
  },

  "Burkina Faso": {
    name: "Burkina Faso",
    level1Label: "Region",
    level2Label: "Province",
    level3Label: "Department",
    divisions: {
      "Boucle du Mouhoun": { "Balé": [], "Banwa": [], "Kossi": [], "Mouhoun": [], "Nayala": [], "Sourou": [] },
      "Cascades": { "Comoé": [], "Léraba": [] },
      "Centre": { "Kadiogo": [] },
      "Centre-Est": { "Boulgou": [], "Koulpélogo": [], "Kouritenga": [] },
      "Centre-Nord": { "Bam": [], "Namentenga": [], "Sanmatenga": [] },
      "Centre-Ouest": { "Boulkiemdé": [], "Sanguié": [], "Sissili": [], "Ziro": [] },
      "Centre-Sud": { "Bazèga": [], "Nahouri": [], "Zoundwéogo": [] },
      "Est": { "Gnagna": [], "Gourma": [], "Komandjoari": [], "Kompienga": [], "Tapoa": [] },
      "Hauts-Bassins": { "Houet": [], "Kénédougou": [], "Tuy": [] },
      "Nord": { "Loroum": [], "Passoré": [], "Yatenga": [], "Zondoma": [] },
      "Plateau-Central": { "Ganzourgou": [], "Kourwéogo": [], "Oubritenga": [] },
      "Sahel": { "Oudalan": [], "Séno": [], "Soum": [], "Yagha": [] },
      "Sud-Ouest": { "Bougouriba": [], "Ioba": [], "Noumbiel": [], "Poni": [] }
    }
  },

  Mali: {
    name: "Mali",
    level1Label: "Region",
    level2Label: "Cercle",
    level3Label: "Commune",
    divisions: {
      "Bamako": { "Commune I": [], "Commune II": [], "Commune III": [], "Commune IV": [], "Commune V": [], "Commune VI": [] },
      "Gao": { "Ansongo": [], "Bourem": [], "Gao": [] },
      "Kayes": { "Bafoulabé": [], "Diéma": [], "Kayes": [], "Kéniéba": [], "Kita": [], "Nioro du Sahel": [], "Yélimané": [] },
      "Kidal": { "Abeïbara": [], "Kidal": [], "Tessalit": [], "Tin-Essako": [] },
      "Koulikoro": { "Banamba": [], "Dioïla": [], "Kangaba": [], "Kati": [], "Kolokani": [], "Koulikoro": [], "Nara": [] },
      "Ménaka": { "Andéramboukane": [], "Ménaka": [] },
      "Mopti": { "Bandiagara": [], "Bankass": [], "Djenné": [], "Douentza": [], "Koro": [], "Mopti": [], "Tenenkou": [], "Youwarou": [] },
      "Ségou": { "Barouéli": [], "Bla": [], "Macina": [], "Niono": [], "San": [], "Ségou": [], "Tominian": [] },
      "Sikasso": { "Bougouni": [], "Kadiolo": [], "Kolondiéba": [], "Koutiala": [], "Sikasso": [], "Yanfolila": [], "Yorosso": [] },
      "Taoudénit": { "Araouane": [], "Taoudénit": [] },
      "Tombouctou": { "Diré": [], "Goundam": [], "Gourma-Rharous": [], "Niafunké": [], "Tombouctou": [] }
    }
  },

  Liberia: {
    name: "Liberia",
    level1Label: "County",
    level2Label: "District",
    level3Label: "Clan",
    divisions: {
      "Bomi": { "Dowein": [], "Klay": [], "Mecca": [], "Senjeh": [] },
      "Bong": { "Fuamah": [], "Jorquelleh": [], "Kokoyah": [], "Panta": [], "Salala": [], "Sanoyea": [], "Suakoko": [], "Tukpahblee": [], "Zota": [] },
      "Gbarpolu": { "Belle": [], "Bokomu": [], "Gbarma": [], "Gola Konneh": [], "Kongba": [] },
      "Grand Bassa": { "Commonwealth": [], "District #1": [], "District #2": [], "District #3": [], "District #4": [], "Owensgrove": [], "St. John River": [] },
      "Grand Cape Mount": { "Commonwealth": [], "Garwula": [], "Gola Konneh": [], "Porkpa": [], "Tewor": [] },
      "Grand Gedeh": { "Gbarzon": [], "Konobo": [], "Tchien": [], "B'hai": [], "Cavalla": [] },
      "Grand Kru": { "Barclayville": [], "Buah": [], "Fenetoe": [], "Grand Kru": [], "Sasstown": [], "Trehn": [], "Wedabo": [] },
      "Lofa": { "Foya": [], "Kolahun": [], "Salayea": [], "Vahun": [], "Voinjama": [], "Zorzor": [] },
      "Margibi": { "Firestone": [], "Gibi": [], "Kakata": [], "Mambah-Kaba": [] },
      "Maryland": { "Harper": [], "Pleebo/Sodoken": [], "Barrobo": [], "Karluway": [] },
      "Montserrado": { "Careysburg": [], "Commonwealth": [], "Greater Monrovia": [], "St. Paul River": [], "Todee": [] },
      "Nimba": { "Bain/Garr": [], "Gbehlay/Geh": [], "Meinpea-Mahn": [], "Saclepea-Mahn": [], "Sanniquellie-Mahn": [], "Tappita": [], "Yarwein-Mehnsonnoh": [], "Zoegeh": [] },
      "River Cess": { "Bearwor": [], "Cess": [], "Morweh": [], "Sam Gbalor": [], "Timbo": [] },
      "River Gee": { "Glaro": [], "Gbeapo": [], "Karforh": [], "Nyenawliken": [], "Webbo": [] },
      "Sinoe": { "Butaw": [], "Dugbe River": [], "Greenville": [], "Jaedae": [], "Jaedepo": [], "Juarzon": [], "Kpanyan": [], "Pynes Town": [] }
    }
  },

  Gambia: {
    name: "Gambia",
    level1Label: "Region",
    level2Label: "District",
    level3Label: "Ward",
    divisions: {
      "Banjul": { "Banjul": [] },
      "Kanifing": { "Kanifing": [] },
      "West Coast Region": { "Brikama": [], "Foni Berefet": [], "Foni Bintang Karanai": [], "Foni Bondali": [], "Foni Jarrol": [], "Foni Kansala": [], "Kombo Central": [], "Kombo East": [], "Kombo North": [], "Kombo South": [] },
      "Lower River Region": { "Jarra Central": [], "Jarra East": [], "Jarra West": [], "Kiang Central": [], "Kiang East": [], "Kiang West": [] },
      "Central River Region": { "Janjanbureh": [], "Kuntaur": [], "Nianija": [], "Niani": [], "Sami": [], "Upper Saloum": [], "Lower Saloum": [] },
      "North Bank Region": { "Central Baddibu": [], "Jokadu": [], "Lower Baddibu": [], "Lower Niumi": [], "Sabach Sanjal": [], "Upper Baddibu": [], "Upper Niumi": [] },
      "Upper River Region": { "Fulladu East": [], "Fulladu West": [], "Jimara": [], "Kantora": [], "Sandu": [], "Wuli East": [], "Wuli West": [] }
    }
  },

  Mauritania: {
    name: "Mauritania",
    level1Label: "Region",
    level2Label: "Department",
    level3Label: "Commune",
    divisions: {
      "Nouakchott-Nord": { "Dar Naim": [], "Teyarett": [], "Toujounine": [] },
      "Nouakchott-Ouest": { "Ksar": [], "Tevragh-Zeina": [] },
      "Nouakchott-Sud": { "Arafat": [], "El Mina": [], "Riyad": [] },
      "Adrar": { "Atar": [], "Chinguetti": [], "Ouadane": [] },
      "Assaba": { "Kiffa": [], "Guérou": [], "Kankossa": [], "Barkéol": [] },
      "Brakna": { "Aleg": [], "Bababe": [], "Boghé": [], "Magta-Lahjar": [], "M'Bagne": [] },
      "Dakhlet Nouadhibou": { "Nouadhibou": [] },
      "Gorgol": { "Kaédi": [], "M'Bout": [], "Maghama": [], "Monguel": [] },
      "Guidimakha": { "Sélibaby": [], "Ould Yengé": [] },
      "Hodh Ech Chargui": { "Néma": [], "Amourj": [], "Bassikounou": [], "Djiguenni": [], "Oualata": [], "Timbédra": [] },
      "Hodh El Gharbi": { "Aioun el Atrouss": [], "Kobenni": [], "Tamchakett": [], "Tintane": [] },
      "Inchiri": { "Akjoujt": [] },
      "Tagant": { "Moudjéria": [], "Tichit": [], "Tidjikja": [] },
      "Tiris Zemmour": { "Bir Moghrein": [], "F'Dérik": [], "Zouérat": [] },
      "Trarza": { "Boutilimit": [], "Mederdra": [], "Ouad Naga": [], "R'Kiz": [], "Rosso": [] }
    }
  },

  "Democratic Republic of Congo": {
    name: "Democratic Republic of Congo",
    level1Label: "Province",
    level2Label: "Territory",
    level3Label: "Sector",
    divisions: {
      "Kinshasa": { "Bandalungwa": [], "Barumbu": [], "Bumbu": [], "Gombe": [], "Kalamu": [], "Kasa-Vubu": [], "Kimbanseke": [], "Kinshasa": [], "Kintambo": [], "Kisenso": [], "Lemba": [], "Limete": [], "Lingwala": [], "Makala": [], "Maluku": [], "Masina": [], "Matete": [], "Mont-Ngafula": [], "Ndjili": [], "Ngaba": [], "Ngaliema": [], "Ngiri-Ngiri": [], "Nsele": [], "Selembao": [] },
      "Bas-Uélé": { "Aketi": [], "Ango": [], "Bambesa": [], "Bondo": [], "Buta": [], "Poko": [] },
      "Équateur": { "Basankusu": [], "Bikoro": [], "Bolomba": [], "Bomongo": [], "Ingende": [], "Lukolela": [], "Mbandaka": [] },
      "Haut-Katanga": { "Kambove": [], "Kasenga": [], "Kipushi": [], "Likasi": [], "Lubumbashi": [], "Mitwaba": [], "Pweto": [], "Sakania": [] },
      "Haut-Lomami": { "Bukama": [], "Kabongo": [], "Kamina": [], "Kaniama": [], "Malemba-Nkulu": [] },
      "Haut-Uélé": { "Dungu": [], "Faradje": [], "Isiro": [], "Niangara": [], "Rungu": [], "Wamba": [], "Watsa": [] },
      "Ituri": { "Aru": [], "Bunia": [], "Djugu": [], "Irumu": [], "Mahagi": [], "Mambasa": [] },
      "Kasaï": { "Dekese": [], "Ilebo": [], "Kamonia": [], "Luebo": [], "Mweka": [], "Tshikapa": [] },
      "Kasaï Central": { "Demba": [], "Dibaya": [], "Dimbelenge": [], "Kananga": [], "Kazumba": [], "Luiza": [] },
      "Kasaï Oriental": { "Kabeya-Kamwanga": [], "Katanda": [], "Lupatapata": [], "Miabi": [], "Mbuji-Mayi": [], "Tshilenge": [] },
      "Kongo Central": { "Boma": [], "Kasangulu": [], "Lukula": [], "Madimba": [], "Matadi": [], "Mbanza-Ngungu": [], "Moanda": [], "Seke-Banza": [], "Songololo": [], "Tshela": [] },
      "Kwango": { "Feshi": [], "Kahemba": [], "Kasongo-Lunda": [], "Kenge": [], "Popokabaka": [] },
      "Kwilu": { "Bagata": [], "Bandundu": [], "Bulungu": [], "Gungu": [], "Idiofa": [], "Kikwit": [], "Mangai": [], "Masi-Manimba": [] },
      "Lomami": { "Kabinda": [], "Kamiji": [], "Lubao": [], "Luilu": [], "Ngandajika": [] },
      "Lualaba": { "Dilolo": [], "Kapanga": [], "Kolwezi": [], "Lubudi": [], "Mutshatsha": [], "Sandoa": [] },
      "Mai-Ndombe": { "Bolobo": [], "Inongo": [], "Kiri": [], "Kutu": [], "Mushie": [], "Oshwe": [], "Yumbi": [] },
      "Maniema": { "Kabambare": [], "Kailo": [], "Kasongo": [], "Kibombo": [], "Kindu": [], "Lubutu": [], "Pangi": [], "Punia": [] },
      "Mongala": { "Bumba": [], "Lisala": [], "Bongandanga": [] },
      "Nord-Kivu": { "Beni": [], "Butembo": [], "Goma": [], "Lubero": [], "Masisi": [], "Nyiragongo": [], "Rutshuru": [], "Walikale": [] },
      "Nord-Ubangi": { "Businga": [], "Gbadolite": [], "Mobayi-Mbongo": [], "Yakoma": [] },
      "Sankuru": { "Katako-Kombe": [], "Kole": [], "Lodja": [], "Lomela": [], "Lubefu": [], "Lusambo": [] },
      "Sud-Kivu": { "Bukavu": [], "Fizi": [], "Idjwi": [], "Kabare": [], "Kalehe": [], "Mwenga": [], "Shabunda": [], "Uvira": [], "Walungu": [] },
      "Sud-Ubangi": { "Gemena": [], "Kungu": [], "Libenge": [], "Zongo": [] },
      "Tanganyika": { "Kalemie": [], "Kongolo": [], "Manono": [], "Moba": [], "Nyunzu": [] },
      "Tshopo": { "Banalia": [], "Basoko": [], "Isangi": [], "Kisangani": [], "Opala": [], "Ubundu": [], "Yahuma": [] },
      "Tshuapa": { "Befale": [], "Boende": [], "Bokungu": [], "Djolu": [], "Ikela": [], "Monkoto": [] }
    }
  },

  "Republic of Congo": {
    name: "Republic of Congo",
    level1Label: "Department",
    level2Label: "District",
    level3Label: "Commune",
    divisions: {
      "Brazzaville": { "Bacongo": [], "Makélékélé": [], "Poto-Poto": [], "Moungali": [], "Ouenzé": [], "Talangaï": [], "Mfilou": [], "Madibou": [], "Djiri": [] },
      "Pointe-Noire": { "Lumumba": [], "Mvou-Mvou": [], "Tié-Tié": [], "Loandjili": [], "Mongo-Mpoukou": [], "Ngoyo": [] },
      "Bouenza": { "Madingou": [], "Nkayi": [], "Mouyondzi": [], "Loudima": [], "Boko-Songho": [], "Kayes": [], "Kingoué": [], "Mabombo": [], "Mfouati": [], "Tsiaki": [], "Yamba": [] },
      "Cuvette": { "Owando": [], "Boundji": [], "Makoua": [], "Oyo": [], "Loukolela": [], "Tchikapika": [] },
      "Cuvette-Ouest": { "Ewo": [], "Etoumbi": [], "Kéllé": [], "Mbama": [], "Mbomo": [], "Okoyo": [] },
      "Kouilou": { "Hinda": [], "Kakamoéka": [], "Mvouti": [], "Nzambi": [], "Tchiamba-Nzassi": [] },
      "Lékoumou": { "Sibiti": [], "Komono": [], "Zanaga": [], "Bambama": [], "Mayéyé": [] },
      "Likouala": { "Impfondo": [], "Bétou": [], "Dongou": [], "Enyellé": [], "Epéna": [], "Liranga": [], "Bouanéla": [] },
      "Niari": { "Dolisie": [], "Divénié": [], "Kibangou": [], "Kimongo": [], "Londéla-Kayes": [], "Makabana": [], "Mayoko": [], "Mossendjo": [], "Nyanga": [] },
      "Plateaux": { "Djambala": [], "Gamboma": [], "Lékana": [], "Makotimpoko": [], "Mbon": [], "Mpouya": [], "Ngo": [], "Ollombo": [] },
      "Pool": { "Kinkala": [], "Boko": [], "Kindamba": [], "Mayama": [], "Mindouli": [], "Ngabé": [], "Vindza": [] },
      "Sangha": { "Ouesso": [], "Mokeko": [], "Pikounda": [], "Sembé": [], "Souanké": [] }
    }
  },

  Cameroon: {
    name: "Cameroon",
    level1Label: "Region",
    level2Label: "Division",
    level3Label: "Sub-division",
    divisions: {
      "Adamawa": { "Djérem": [], "Faro-et-Déo": [], "Mayo-Banyo": [], "Mbéré": [], "Vina": [] },
      "Centre": { "Haute-Sanaga": [], "Lekié": [], "Mbam-et-Inoubou": [], "Mbam-et-Kim": [], "Méfou-et-Afamba": [], "Méfou-et-Akono": [], "Mfoundi": [], "Nyong-et-Kellé": [], "Nyong-et-Mfoumou": [], "Nyong-et-So'o": [] },
      "East": { "Boumba-et-Ngoko": [], "Haut-Nyong": [], "Kadey": [], "Lom-et-Djérem": [] },
      "Far North": { "Diamaré": [], "Logone-et-Chari": [], "Mayo-Danay": [], "Mayo-Kani": [], "Mayo-Sava": [], "Mayo-Tsanaga": [] },
      "Littoral": { "Moungo": [], "Nkam": [], "Sanaga-Maritime": [], "Wouri": [] },
      "North": { "Bénoué": [], "Faro": [], "Mayo-Louti": [], "Mayo-Rey": [] },
      "North-West": { "Boyo": [], "Bui": [], "Donga-Mantung": [], "Menchum": [], "Mezam": [], "Momo": [], "Ngo-Ketunjia": [] },
      "South": { "Dja-et-Lobo": [], "Mvila": [], "Océan": [], "Vallée-du-Ntem": [] },
      "South-West": { "Fako": [], "Koupé-Manengouba": [], "Lebialem": [], "Manyu": [], "Meme": [], "Ndian": [] },
      "West": { "Bamboutos": [], "Haut-Nkam": [], "Hauts-Plateaux": [], "Koung-Khi": [], "Menoua": [], "Mifi": [], "Ndé": [], "Noun": [] }
    }
  }
};

// Helper functions
export const getCountries = (): string[] => Object.keys(locationData);

export const getCountryConfig = (country: string): CountryConfig | undefined => locationData[country];

export const getLevel1Divisions = (country: string): string[] => {
  const config = locationData[country];
  if (!config) return [];
  return Object.keys(config.divisions);
};

export const getLevel2Divisions = (country: string, level1: string): string[] => {
  const config = locationData[country];
  if (!config || !config.divisions[level1]) return [];
  return Object.keys(config.divisions[level1]);
};

export const getLevel3Divisions = (country: string, level1: string, level2: string): string[] => {
  const config = locationData[country];
  if (!config || !config.divisions[level1] || !config.divisions[level1][level2]) return [];
  return config.divisions[level1][level2];
};

export const getLevel1Label = (country: string): string => locationData[country]?.level1Label || "Region";
export const getLevel2Label = (country: string): string => locationData[country]?.level2Label || "District";
export const getLevel3Label = (country: string): string => locationData[country]?.level3Label || "Ward";

export default locationData;
