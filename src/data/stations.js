// West Bengal Railway Stations organized by district and route
// Based on real Indian Railways data

export const districts = [
    'Howrah', 'Kolkata', 'Hooghly', 'North 24 Parganas', 'South 24 Parganas',
    'Nadia', 'Bardhaman', 'Purba Bardhaman', 'Paschim Bardhaman', 'Murshidabad',
    'Birbhum', 'Bankura', 'Purulia', 'West Midnapore', 'East Midnapore',
    'Jhargram', 'Malda', 'North Dinajpur', 'South Dinajpur', 'Jalpaiguri',
    'Darjeeling', 'Cooch Behar', 'Alipurduar', 'Hugli',
];

export const stations = [
    // Howrah District
    { code: 'HWH', name: 'Howrah Jn', district: 'Howrah', pincode: '711101', lat: 22.5839, lng: 88.3428 },
    { code: 'SRC', name: 'Santragachi Jn', district: 'Howrah', pincode: '711104', lat: 22.5750, lng: 88.2710 },
    { code: 'LLH', name: 'Liluah', district: 'Howrah', pincode: '711204', lat: 22.6190, lng: 88.3490 },
    { code: 'BEQ', name: 'Belur', district: 'Howrah', pincode: '711202', lat: 22.6310, lng: 88.3510 },
    { code: 'BLY', name: 'Bally', district: 'Howrah', pincode: '711201', lat: 22.6500, lng: 88.3400 },
    { code: 'BRMH', name: 'Belur Math', district: 'Howrah', pincode: '711202', lat: 22.6320, lng: 88.3480 },
    { code: 'ADL', name: 'Andul', district: 'Howrah', pincode: '711302', lat: 22.5630, lng: 88.2310 },
    { code: 'SEL', name: 'Sankrail', district: 'Howrah', pincode: '711309', lat: 22.5580, lng: 88.2180 },
    { code: 'ABB', name: 'Abada', district: 'Howrah', pincode: '711313', lat: 22.5470, lng: 88.1960 },
    { code: 'NLR', name: 'Nalpur', district: 'Howrah', pincode: '711316', lat: 22.5380, lng: 88.1830 },
    { code: 'BVS', name: 'Bauria Jn', district: 'Howrah', pincode: '711310', lat: 22.5240, lng: 88.1700 },
    { code: 'CGA', name: 'Chengel', district: 'Howrah', pincode: '711316', lat: 22.5050, lng: 88.1570 },
    { code: 'FLR', name: 'Phuleswar', district: 'Howrah', pincode: '711316', lat: 22.4910, lng: 88.1430 },
    { code: 'ULB', name: 'Ulubaria', district: 'Howrah', pincode: '711315', lat: 22.4708, lng: 88.0986 },
    { code: 'BZN', name: 'Bagnan', district: 'Howrah', pincode: '711303', lat: 22.4607, lng: 88.0604 },
    { code: 'DTE', name: 'Deulti', district: 'Howrah', pincode: '711304', lat: 22.4380, lng: 88.0220 },
    { code: 'TPKR', name: 'Tikiapara', district: 'Howrah', pincode: '711101', lat: 22.5770, lng: 88.3300 },
    { code: 'DSNR', name: 'Dasnagar', district: 'Howrah', pincode: '711105', lat: 22.5690, lng: 88.3100 },
    { code: 'RMJ', name: 'Ramrajatala', district: 'Howrah', pincode: '711104', lat: 22.5660, lng: 88.2900 },
    { code: 'MOM', name: 'Maurigram', district: 'Howrah', pincode: '711302', lat: 22.5640, lng: 88.2520 },
    { code: 'BKNM', name: 'Bankra Nayabaj', district: 'Howrah', pincode: '711403', lat: 22.5500, lng: 88.2600 },
    { code: 'BAC', name: 'Bargachia', district: 'Howrah', pincode: '711410', lat: 22.5300, lng: 88.2700 },
    { code: 'AMZ', name: 'Amta', district: 'Howrah', pincode: '711401', lat: 22.4500, lng: 88.1500 },
    { code: 'DMJ', name: 'Domjur', district: 'Howrah', pincode: '711405', lat: 22.5200, lng: 88.2400 },
    { code: 'KIG', name: 'Kolaghat', district: 'Howrah', pincode: '721134', lat: 22.4280, lng: 87.9700 },
    { code: 'MCA', name: 'Mecheda', district: 'Howrah', pincode: '721137', lat: 22.4050, lng: 87.9300 },

    // Kolkata
    { code: 'SDAH', name: 'Sealdah', district: 'Kolkata', pincode: '700014', lat: 22.5650, lng: 88.3699 },
    { code: 'KOAA', name: 'Kolkata', district: 'Kolkata', pincode: '700001', lat: 22.5830, lng: 88.3430 },
    { code: 'DH', name: 'Dum Dum Jn', district: 'Kolkata', pincode: '700028', lat: 22.6220, lng: 88.4270 },
    { code: 'BLN', name: 'Ballygunge Jn', district: 'Kolkata', pincode: '700019', lat: 22.5260, lng: 88.3640 },
    { code: 'BARN', name: 'Baranagar Road', district: 'Kolkata', pincode: '700108', lat: 22.6450, lng: 88.3800 },
    { code: 'CG', name: 'Canning', district: 'South 24 Parganas', pincode: '743329', lat: 22.3100, lng: 88.6700 },
    { code: 'SPR', name: 'Sonarpur Jn', district: 'South 24 Parganas', pincode: '700150', lat: 22.4400, lng: 88.4200 },
    { code: 'BRP', name: 'Baruipur Jn', district: 'South 24 Parganas', pincode: '700144', lat: 22.3550, lng: 88.4330 },
    { code: 'LKPR', name: 'Lakshmikantapur', district: 'South 24 Parganas', pincode: '743363', lat: 22.1100, lng: 88.3200 },
    { code: 'DHR', name: 'Diamond Harbour', district: 'South 24 Parganas', pincode: '743331', lat: 22.1900, lng: 88.1900 },

    // North 24 Parganas
    { code: 'BT', name: 'Barasat', district: 'North 24 Parganas', pincode: '700129', lat: 22.7200, lng: 88.4800 },
    { code: 'AGP', name: 'Agarpara', district: 'North 24 Parganas', pincode: '700109', lat: 22.6850, lng: 88.3820 },
    { code: 'BNJ', name: 'Bangaon Jn', district: 'North 24 Parganas', pincode: '743235', lat: 23.0428, lng: 88.8228 },
    { code: 'HTAE', name: 'Habra', district: 'North 24 Parganas', pincode: '743263', lat: 22.8400, lng: 88.6600 },
    { code: 'BHR', name: 'Bhadreshwar', district: 'North 24 Parganas', pincode: '700125', lat: 22.6900, lng: 88.3700 },
    { code: 'BRPA', name: 'Baruipara', district: 'North 24 Parganas', pincode: '712136', lat: 22.7800, lng: 88.2500 },

    // Hooghly District
    { code: 'UPA', name: 'Uttarpara', district: 'Hooghly', pincode: '712258', lat: 22.6670, lng: 88.3450 },
    { code: 'HMZ', name: 'Hind Motor', district: 'Hooghly', pincode: '712233', lat: 22.6670, lng: 88.3400 },
    { code: 'KOG', name: 'Konnagar', district: 'Hooghly', pincode: '712235', lat: 22.6870, lng: 88.3400 },
    { code: 'RIS', name: 'Rishra', district: 'Hooghly', pincode: '712248', lat: 22.7118, lng: 88.3354 },
    { code: 'SRP', name: 'Shrirampur', district: 'Hooghly', pincode: '712203', lat: 22.7360, lng: 88.3440 },
    { code: 'SHE', name: 'Seoraphuli Jn', district: 'Hooghly', pincode: '712223', lat: 22.7500, lng: 88.3380 },
    { code: 'BBAE', name: 'Baidyabati', district: 'Hooghly', pincode: '712222', lat: 22.7900, lng: 88.3200 },
    { code: 'MUU', name: 'Mankundu', district: 'Hooghly', pincode: '712139', lat: 22.8030, lng: 88.3870 },
    { code: 'CGR', name: 'Chandan Nagar', district: 'Hooghly', pincode: '712136', lat: 22.8618, lng: 88.3630 },
    { code: 'CNS', name: 'Chuchura', district: 'Hooghly', pincode: '712102', lat: 22.8800, lng: 88.3740 },
    { code: 'HGY', name: 'Hooghly', district: 'Hooghly', pincode: '712103', lat: 22.8900, lng: 88.3890 },
    { code: 'BDC', name: 'Bandel Jn', district: 'Hooghly', pincode: '712123', lat: 22.9340, lng: 88.3830 },
    { code: 'ADST', name: 'Adi Saptagram', district: 'Hooghly', pincode: '712502', lat: 22.9450, lng: 88.3980 },
    { code: 'MUG', name: 'Magra', district: 'Hooghly', pincode: '712148', lat: 22.9500, lng: 88.4100 },
    { code: 'TLO', name: 'Talandu', district: 'Hooghly', pincode: '712401', lat: 22.9580, lng: 88.4300 },
    { code: 'KHN', name: 'Khanyan', district: 'Hooghly', pincode: '712401', lat: 22.9700, lng: 88.4500 },
    { code: 'PDA', name: 'Pundooah', district: 'Hooghly', pincode: '712420', lat: 22.9940, lng: 88.4680 },
    { code: 'SLG', name: 'Simlagarh', district: 'Hooghly', pincode: '712405', lat: 23.0100, lng: 88.4900 },
    { code: 'TAK', name: 'Tarakeswar', district: 'Hooghly', pincode: '712410', lat: 22.8910, lng: 88.0200 },
    { code: 'HPL', name: 'Haripal', district: 'Hooghly', pincode: '712405', lat: 22.8400, lng: 88.0700 },
    { code: 'SIU', name: 'Singur', district: 'Hooghly', pincode: '712409', lat: 22.8200, lng: 88.1300 },
    { code: 'KQU', name: 'Kamarkundu', district: 'Hooghly', pincode: '712119', lat: 22.8000, lng: 88.1700 },
    { code: 'BAHW', name: 'Bahir Khanda', district: 'Hooghly', pincode: '712405', lat: 22.8600, lng: 88.0500 },
    { code: 'BSAE', name: 'Bansh Baria', district: 'Hooghly', pincode: '712502', lat: 22.9500, lng: 88.3700 },
    { code: 'TBAE', name: 'Tribeni', district: 'Hooghly', pincode: '712503', lat: 22.9800, lng: 88.3500 },
    { code: 'KJU', name: 'Kuntighat', district: 'Hooghly', pincode: '712512', lat: 23.0000, lng: 88.3300 },
    { code: 'JIT', name: 'Jirat', district: 'Hooghly', pincode: '712502', lat: 23.0200, lng: 88.3100 },
    { code: 'BGAE', name: 'Balagarh', district: 'Hooghly', pincode: '712514', lat: 23.0500, lng: 88.2900 },
    { code: 'GPAE', name: 'Guptipara', district: 'Hooghly', pincode: '712512', lat: 23.0900, lng: 88.2400 },
    { code: 'AMBG', name: 'Arambag', district: 'Hooghly', pincode: '712601', lat: 22.8840, lng: 87.7870 },
    { code: 'GOGT', name: 'Goghat', district: 'Hooghly', pincode: '712614', lat: 22.8450, lng: 87.7100 },
    { code: 'BCGM', name: 'Bainchigram', district: 'Hooghly', pincode: '712134', lat: 23.0350, lng: 88.5100 },
    { code: 'BOI', name: 'Bainchi', district: 'Hooghly', pincode: '712134', lat: 23.0500, lng: 88.5200 },

    // Nadia District
    { code: 'KNJ', name: 'Krishnanagar City Jn', district: 'Nadia', pincode: '741101', lat: 23.3800, lng: 88.5150 },
    { code: 'RNH', name: 'Ranaghat Jn', district: 'Nadia', pincode: '741201', lat: 23.1800, lng: 88.5750 },
    { code: 'AG', name: 'Aranghata', district: 'Nadia', pincode: '741501', lat: 23.1500, lng: 88.5300 },
    { code: 'BGL', name: 'Bagula', district: 'Nadia', pincode: '741502', lat: 23.1200, lng: 88.5500 },
    { code: 'NDAE', name: 'Nabadwip Dham', district: 'Nadia', pincode: '741302', lat: 23.3700, lng: 88.3700 },
    { code: 'BDZ', name: 'Badkulla', district: 'Nadia', pincode: '741121', lat: 23.2600, lng: 88.6300 },
    { code: 'KWAE', name: 'Katwa Jn', district: 'Nadia', pincode: '713130', lat: 23.6300, lng: 88.1300 },
    { code: 'CHT', name: 'Chakdah Jn', district: 'Nadia', pincode: '741222', lat: 23.0800, lng: 88.5200 },
    { code: 'SDPUR', name: 'Shantipur', district: 'Nadia', pincode: '741404', lat: 23.2500, lng: 88.4300 },
    { code: 'PLAE', name: 'Palsit', district: 'Nadia', pincode: '713513', lat: 23.2100, lng: 88.3000 },

    // Bardhaman / Purba Bardhaman
    { code: 'BWN', name: 'Barddhaman Jn', district: 'Bardhaman', pincode: '713101', lat: 23.2583, lng: 87.8615 },
    { code: 'MYM', name: 'Memari', district: 'Bardhaman', pincode: '713146', lat: 23.1800, lng: 88.1200 },
    { code: 'BGF', name: 'Bagila', district: 'Bardhaman', pincode: '713146', lat: 23.1500, lng: 88.1800 },
    { code: 'SKG', name: 'Saktigarh', district: 'Bardhaman', pincode: '713166', lat: 23.2300, lng: 87.9200 },
    { code: 'GRP', name: 'Gangpur', district: 'Bardhaman', pincode: '713102', lat: 23.2400, lng: 87.8800 },
    { code: 'RSLR', name: 'Rasulpur', district: 'Bardhaman', pincode: '713145', lat: 23.2000, lng: 87.9800 },
    { code: 'NMF', name: 'Nimo', district: 'Bardhaman', pincode: '713144', lat: 23.1900, lng: 88.0400 },
    { code: 'ABKA', name: 'Ambika Kalna', district: 'Bardhaman', pincode: '713409', lat: 23.2200, lng: 88.3600 },
    { code: 'BGRA', name: 'Baghnapara', district: 'Bardhaman', pincode: '713501', lat: 23.2500, lng: 88.3200 },
    { code: 'DTAE', name: 'Dhatrigram', district: 'Bardhaman', pincode: '713150', lat: 23.2800, lng: 88.2800 },
    { code: 'SMAE', name: 'Samudragarh', district: 'Bardhaman', pincode: '713512', lat: 23.3200, lng: 88.2000 },
    { code: 'AGAE', name: 'Agradwip', district: 'Bardhaman', pincode: '713502', lat: 23.4200, lng: 88.1700 },

    // Paschim Bardhaman
    { code: 'ASN', name: 'Asansol Jn', district: 'Paschim Bardhaman', pincode: '713301', lat: 23.6868, lng: 86.9548 },
    { code: 'DGR', name: 'Durgapur', district: 'Paschim Bardhaman', pincode: '713201', lat: 23.5204, lng: 87.3119 },
    { code: 'UDL', name: 'Andal Jn', district: 'Paschim Bardhaman', pincode: '713321', lat: 23.5600, lng: 87.2100 },
    { code: 'RNG', name: 'Raniganj', district: 'Paschim Bardhaman', pincode: '713347', lat: 23.6100, lng: 87.1300 },
    { code: 'MSAE', name: 'Masagram Jn', district: 'Paschim Bardhaman', pincode: '713101', lat: 23.2700, lng: 87.7800 },
    { code: 'OYR', name: 'Waria', district: 'Paschim Bardhaman', pincode: '713207', lat: 23.5300, lng: 87.2500 },
    { code: 'PAN', name: 'Panagarh', district: 'Paschim Bardhaman', pincode: '713148', lat: 23.4600, lng: 87.4300 },
    { code: 'GAL', name: 'Galsi', district: 'Paschim Bardhaman', pincode: '713406', lat: 23.3500, lng: 87.6200 },

    // Murshidabad
    { code: 'AZ', name: 'Azimganj Jn', district: 'Murshidabad', pincode: '742104', lat: 24.2200, lng: 88.2700 },
    { code: 'BHW', name: 'Berhampore Court', district: 'Murshidabad', pincode: '742101', lat: 24.0900, lng: 88.2600 },
    { code: 'ACLE', name: 'Azimganj City', district: 'Murshidabad', pincode: '742104', lat: 24.2200, lng: 88.2600 },
    { code: 'JRP', name: 'Jiaganj', district: 'Murshidabad', pincode: '742123', lat: 24.2100, lng: 88.2400 },
    { code: 'LDP', name: 'Lalbagh Court Road', district: 'Murshidabad', pincode: '742149', lat: 24.1800, lng: 88.2600 },

    // Birbhum
    { code: 'BHP', name: 'Bolpur Shantiniketan', district: 'Birbhum', pincode: '731204', lat: 23.6740, lng: 87.7060 },
    { code: 'RPH', name: 'Rampurhat Jn', district: 'Birbhum', pincode: '731224', lat: 24.1700, lng: 87.7800 },
    { code: 'SNT', name: 'Sainthia Jn', district: 'Birbhum', pincode: '731234', lat: 23.9400, lng: 87.6900 },
    { code: 'PNE', name: 'Prantik', district: 'Birbhum', pincode: '731204', lat: 23.7000, lng: 87.7200 },
    { code: 'AMP', name: 'Ahmadpur Jn', district: 'Birbhum', pincode: '731201', lat: 23.8500, lng: 87.7000 },
    { code: 'NHT', name: 'Nalhati Jn', district: 'Birbhum', pincode: '731243', lat: 24.3100, lng: 87.8200 },
    { code: 'TPAE', name: 'Tarapith Road', district: 'Birbhum', pincode: '731233', lat: 24.0100, lng: 87.6700 },

    // Bankura
    { code: 'BQA', name: 'Bankura', district: 'Bankura', pincode: '722101', lat: 23.2367, lng: 87.0675 },
    { code: 'VSU', name: 'Bishnupur Jn', district: 'Bankura', pincode: '722122', lat: 23.0747, lng: 87.3217 },
    { code: 'ODM', name: 'Ondagram', district: 'Bankura', pincode: '722134', lat: 23.1100, lng: 87.2800 },
    { code: 'CJN', name: 'Chhatna', district: 'Bankura', pincode: '722132', lat: 23.2900, lng: 87.0300 },
    { code: 'MSG', name: 'Masagram', district: 'Bankura', pincode: '722101', lat: 23.2500, lng: 87.2700 },

    // Purulia
    { code: 'PRR', name: 'Purulia Jn', district: 'Purulia', pincode: '723101', lat: 23.3354, lng: 86.3524 },
    { code: 'ADRA', name: 'Adra Jn', district: 'Purulia', pincode: '723121', lat: 23.5000, lng: 86.6700 },
    { code: 'ANR', name: 'Anara', district: 'Purulia', pincode: '723126', lat: 23.5700, lng: 86.7700 },
    { code: 'BBM', name: 'Barabhum', district: 'Purulia', pincode: '723127', lat: 23.4700, lng: 86.7200 },
    { code: 'BGA', name: 'Bagalia', district: 'Purulia', pincode: '723126', lat: 23.5500, lng: 86.8100 },
    { code: 'BRR', name: 'Barakar', district: 'Purulia', pincode: '713324', lat: 23.7400, lng: 86.8600 },

    // West Midnapore
    { code: 'MDN', name: 'Midnapore', district: 'West Midnapore', pincode: '721101', lat: 22.4254, lng: 87.3191 },
    { code: 'KGP', name: 'Kharagpur Jn', district: 'West Midnapore', pincode: '721301', lat: 22.3300, lng: 87.3237 },
    { code: 'GBA', name: 'Garhbeta', district: 'West Midnapore', pincode: '721127', lat: 22.9300, lng: 87.3200 },
    { code: 'PKU', name: 'Panskura Jn', district: 'West Midnapore', pincode: '721139', lat: 22.4100, lng: 87.7200 },
    { code: 'BCK', name: 'Balichak', district: 'West Midnapore', pincode: '721124', lat: 22.4000, lng: 87.4500 },
    { code: 'SLB', name: 'Salboni', district: 'West Midnapore', pincode: '721147', lat: 22.5700, lng: 87.2300 },
    { code: 'VKD', name: 'Bakhrabad', district: 'West Midnapore', pincode: '721424', lat: 22.3500, lng: 87.4200 },
    { code: 'GMDN', name: 'Girimaidan', district: 'West Midnapore', pincode: '721301', lat: 22.3400, lng: 87.3300 },
    { code: 'GKL', name: 'Gokulpur', district: 'West Midnapore', pincode: '721301', lat: 22.3500, lng: 87.3300 },

    // East Midnapore
    { code: 'TMK', name: 'Tamluk', district: 'East Midnapore', pincode: '721636', lat: 22.2740, lng: 87.9304 },
    { code: 'HLZ', name: 'Haldia', district: 'East Midnapore', pincode: '721602', lat: 22.0230, lng: 88.0620 },
    { code: 'DIG', name: 'Digha', district: 'East Midnapore', pincode: '721428', lat: 21.6260, lng: 87.5480 },
    { code: 'CNT', name: 'Contai', district: 'East Midnapore', pincode: '721401', lat: 21.7800, lng: 87.7500 },

    // Jhargram
    { code: 'JGM', name: 'Jhargram', district: 'Jhargram', pincode: '721507', lat: 22.4496, lng: 86.9943 },

    // Malda
    { code: 'MLDT', name: 'Malda Town', district: 'Malda', pincode: '732101', lat: 25.0100, lng: 88.1400 },
    { code: 'MLFC', name: 'Malda Court', district: 'Malda', pincode: '732101', lat: 25.0000, lng: 88.1300 },
    { code: 'OMLF', name: 'Old Malda', district: 'Malda', pincode: '732128', lat: 25.0200, lng: 88.1200 },
    { code: 'ADF', name: 'Adina', district: 'Malda', pincode: '732128', lat: 24.8800, lng: 88.1100 },
    { code: 'NFK', name: 'New Farakka Jn', district: 'Malda', pincode: '732125', lat: 24.8100, lng: 87.9100 },
    { code: 'EKI', name: 'Eklakhi Jn', district: 'Malda', pincode: '732142', lat: 25.0500, lng: 88.0200 },
    { code: 'GZO', name: 'Gazole', district: 'Malda', pincode: '732124', lat: 25.2000, lng: 88.1800 },

    // North Dinajpur (Uttar Dinajpur)
    { code: 'RDP', name: 'Radhikapur', district: 'North Dinajpur', pincode: '733145', lat: 25.8700, lng: 88.4200 },
    { code: 'AUB', name: 'Aluabari Road', district: 'North Dinajpur', pincode: '733207', lat: 26.3200, lng: 88.3500 },
    { code: 'DLK', name: 'Dalkhola', district: 'North Dinajpur', pincode: '733201', lat: 25.8900, lng: 87.8400 },
    { code: 'ISP', name: 'Islampur', district: 'North Dinajpur', pincode: '733202', lat: 26.2700, lng: 88.2100 },
    { code: 'KDPR', name: 'Kumedpur Jn', district: 'North Dinajpur', pincode: '733145', lat: 25.3200, lng: 88.1500 },
    { code: 'BMGR', name: 'Bamangram', district: 'North Dinajpur', pincode: '733134', lat: 25.4000, lng: 88.1200 },

    // South Dinajpur (Dakshin Dinajpur)
    { code: 'BLGT', name: 'Balurghat', district: 'South Dinajpur', pincode: '733101', lat: 25.2200, lng: 88.7700 },
    { code: 'BNDP', name: 'Buniadpur', district: 'South Dinajpur', pincode: '733121', lat: 25.2800, lng: 88.5700 },
    { code: 'GRMP', name: 'Gangarampur', district: 'South Dinajpur', pincode: '733124', lat: 25.3900, lng: 88.5300 },

    // Jalpaiguri
    { code: 'NJP', name: 'New Jalpaiguri', district: 'Jalpaiguri', pincode: '734001', lat: 26.7100, lng: 88.4080 },
    { code: 'SGUJ', name: 'Siliguri Jn', district: 'Jalpaiguri', pincode: '734001', lat: 26.7120, lng: 88.4550 },
    { code: 'JPG', name: 'Jalpaiguri', district: 'Jalpaiguri', pincode: '735101', lat: 26.5200, lng: 88.7300 },
    { code: 'NMZ', name: 'New Mal Jn', district: 'Jalpaiguri', pincode: '735220', lat: 26.8000, lng: 88.7300 },
    { code: 'DQG', name: 'Dhupguri', district: 'Jalpaiguri', pincode: '735210', lat: 26.5600, lng: 89.0200 },
    { code: 'FLK', name: 'Falakata', district: 'Jalpaiguri', pincode: '735211', lat: 26.5300, lng: 89.2000 },
    { code: 'ABFC', name: 'Ambari Falakata', district: 'Jalpaiguri', pincode: '735135', lat: 26.5200, lng: 89.1800 },
    { code: 'BNV', name: 'Binnaguri', district: 'Jalpaiguri', pincode: '735233', lat: 26.8100, lng: 88.6000 },
    { code: 'HDB', name: 'Haldibari', district: 'Jalpaiguri', pincode: '735122', lat: 26.3400, lng: 88.7600 },
    { code: 'BRQ', name: 'Bagrakot', district: 'Jalpaiguri', pincode: '734501', lat: 26.8800, lng: 88.5800 },
    { code: 'MDT', name: 'Madarihat', district: 'Jalpaiguri', pincode: '735220', lat: 26.7200, lng: 89.3200 },

    // Darjeeling
    { code: 'DJ', name: 'Darjeeling', district: 'Darjeeling', pincode: '734101', lat: 27.0461, lng: 88.2627 },
    { code: 'KGN', name: 'Kurseong', district: 'Darjeeling', pincode: '734203', lat: 26.8780, lng: 88.2785 },
    { code: 'GHUM', name: 'Ghum', district: 'Darjeeling', pincode: '734102', lat: 27.0120, lng: 88.2610 },
    { code: 'SN', name: 'Sukna', district: 'Darjeeling', pincode: '734209', lat: 26.8400, lng: 88.3400 },
    { code: 'BORA', name: 'Baghdogra', district: 'Darjeeling', pincode: '734421', lat: 26.6870, lng: 88.3170 },
    { code: 'KNE', name: 'Kishanganj', district: 'Darjeeling', pincode: '734421', lat: 26.1100, lng: 87.9400 },

    // Cooch Behar
    { code: 'NCB', name: 'New Cooch Behar', district: 'Cooch Behar', pincode: '736101', lat: 26.3370, lng: 89.4450 },
    { code: 'COB', name: 'Cooch Behar', district: 'Cooch Behar', pincode: '736101', lat: 26.3300, lng: 89.4400 },
    { code: 'DHH', name: 'Dinhata', district: 'Cooch Behar', pincode: '736135', lat: 26.1300, lng: 89.4600 },
    { code: 'BXT', name: 'Bamanhat', district: 'Cooch Behar', pincode: '736168', lat: 26.3800, lng: 89.8200 },
    { code: 'BSW', name: 'Baneswar', district: 'Cooch Behar', pincode: '736133', lat: 26.2600, lng: 89.5200 },

    // Alipurduar
    { code: 'APDJ', name: 'Alipur Duar Jn', district: 'Alipurduar', pincode: '736123', lat: 26.4850, lng: 89.5270 },
    { code: 'NOQ', name: 'New Alipurduar', district: 'Alipurduar', pincode: '736122', lat: 26.5500, lng: 89.5200 },
    { code: 'HSA', name: 'Hasimara', district: 'Alipurduar', pincode: '736101', lat: 26.7200, lng: 89.3500 },
    { code: 'RVK', name: 'Raja Bhat Khawa', district: 'Alipurduar', pincode: '735225', lat: 26.6700, lng: 89.4100 },
    { code: 'SMTA', name: 'Samuktala Road', district: 'Alipurduar', pincode: '736206', lat: 26.4100, lng: 89.6300 },
    { code: 'APD', name: 'Alipur Duar', district: 'Alipurduar', pincode: '736121', lat: 26.4900, lng: 89.5200 },

    // Additional stations for suburban routes
    { code: 'DKAE', name: 'Dankuni Jn', district: 'Hooghly', pincode: '712310', lat: 22.6800, lng: 88.2900 },
    { code: 'DBP', name: 'Debipur', district: 'Bardhaman', pincode: '712134', lat: 23.1000, lng: 88.2500 },
    { code: 'LOK', name: 'Loknath', district: 'Hooghly', pincode: '712410', lat: 22.8900, lng: 88.0100 },
    { code: 'KMKL', name: 'Kamarkundu Lower', district: 'Hooghly', pincode: '712119', lat: 22.7900, lng: 88.1600 },
    { code: 'NKL', name: 'Nalikul', district: 'Hooghly', pincode: '712407', lat: 22.8100, lng: 88.1100 },
    { code: 'MLYH', name: 'Maliya H', district: 'Hooghly', pincode: '712405', lat: 22.8300, lng: 88.0900 },
    { code: 'KKAE', name: 'Kaikala', district: 'Hooghly', pincode: '712405', lat: 22.8500, lng: 88.0600 },

    // More suburban stations
    { code: 'GBRA', name: 'Gobra', district: 'Hooghly', pincode: '712310', lat: 22.7000, lng: 88.2700 },
    { code: 'JOX', name: 'Janai Road', district: 'Hooghly', pincode: '712310', lat: 22.7100, lng: 88.2500 },
    { code: 'BPAE', name: 'Begampur', district: 'Hooghly', pincode: '712306', lat: 22.7300, lng: 88.2300 },
    { code: 'MBE', name: 'Mirzapur Bankipur', district: 'Hooghly', pincode: '712302', lat: 22.7500, lng: 88.2100 },
    { code: 'BLAE', name: 'Balarambati', district: 'Hooghly', pincode: '712409', lat: 22.7700, lng: 88.1900 },
    { code: 'MDSE', name: 'Madhusudanpur', district: 'Hooghly', pincode: '712119', lat: 22.8050, lng: 88.1500 },
    { code: 'CDAE', name: 'Chandanpur', district: 'Hooghly', pincode: '712412', lat: 22.8200, lng: 88.1300 },
    { code: 'PBZ', name: 'Porabazar', district: 'Hooghly', pincode: '712412', lat: 22.8400, lng: 88.1100 },
    { code: 'BMAE', name: 'Belmuri', district: 'Hooghly', pincode: '712412', lat: 22.8600, lng: 88.0900 },
    { code: 'GRAE', name: 'Gurap', district: 'Hooghly', pincode: '712303', lat: 22.9200, lng: 88.0300 },
    { code: 'JRAE', name: 'Jaugram', district: 'Bardhaman', pincode: '713104', lat: 23.0800, lng: 87.8800 },
    { code: 'NBAE', name: 'Nabagram', district: 'Bardhaman', pincode: '713104', lat: 23.1200, lng: 87.8500 },
    { code: 'CHC', name: 'Chanchai', district: 'Bardhaman', pincode: '713101', lat: 23.2100, lng: 87.8300 },

    // Sealdah suburban stations
    { code: 'BRPJ', name: 'Bidhan Nagar Road', district: 'Kolkata', pincode: '700064', lat: 22.5750, lng: 88.4050 },
    { code: 'SJR', name: 'Subhas Nagar', district: 'Kolkata', pincode: '700065', lat: 22.5900, lng: 88.4200 },
    { code: 'NSC', name: 'Naihati Jn', district: 'North 24 Parganas', pincode: '743165', lat: 22.8900, lng: 88.4200 },
    { code: 'HNB', name: 'Halishahar', district: 'North 24 Parganas', pincode: '743134', lat: 22.9300, lng: 88.4100 },
    { code: 'KLYM', name: 'Kalyani', district: 'Nadia', pincode: '741235', lat: 22.9800, lng: 88.4500 },
    { code: 'BOE', name: 'Barsoi Jn', district: 'North Dinajpur', pincode: '733207', lat: 25.7100, lng: 87.8300 },
];

// Route definitions for West Bengal railways
export const routeTemplates = [
    {
        id: 'main_line',
        name: 'Howrah-Barddhaman Main Line',
        stations: ['HWH', 'LLH', 'BEQ', 'BLY', 'UPA', 'HMZ', 'KOG', 'RIS', 'SRP', 'SHE', 'BBAE', 'BHR', 'MUU', 'CGR', 'CNS', 'HGY', 'BDC', 'ADST', 'MUG', 'TLO', 'KHN', 'PDA', 'SLG', 'BCGM', 'BOI', 'DBP', 'BGF', 'MYM', 'NMF', 'RSLR', 'PLAE', 'SKG', 'GRP', 'BWN'],
        types: ['Suburban', 'MEMU'],
    },
    {
        id: 'chord_line',
        name: 'Howrah-Barddhaman Chord Line',
        stations: ['HWH', 'LLH', 'BEQ', 'BLY', 'DKAE', 'GBRA', 'JOX', 'BPAE', 'BRPA', 'MBE', 'BLAE', 'KQU', 'MDSE', 'CDAE', 'PBZ', 'BMAE', 'GRAE', 'JRAE', 'NBAE', 'MSAE', 'CHC', 'SKG', 'GRP', 'BWN'],
        types: ['Suburban'],
    },
    {
        id: 'tarakeswar_line',
        name: 'Howrah-Tarakeswar-Arambag',
        stations: ['HWH', 'LLH', 'BEQ', 'BLY', 'UPA', 'HMZ', 'KOG', 'RIS', 'SRP', 'SHE', 'SIU', 'KMKL', 'NKL', 'MLYH', 'HPL', 'KKAE', 'BAHW', 'LOK', 'TAK'],
        types: ['Suburban'],
    },
    {
        id: 'tarakeswar_ext',
        name: 'Tarakeswar-Arambag-Goghat',
        stations: ['TAK', 'AMBG', 'GOGT'],
        types: ['Suburban'],
    },
    {
        id: 'bandel_katwa',
        name: 'Bandel-Katwa Line',
        stations: ['BDC', 'BSAE', 'TBAE', 'KJU', 'JIT', 'BGAE', 'GPAE', 'ABKA', 'BGRA', 'DTAE', 'SMAE', 'NDAE', 'AGAE', 'KWAE'],
        types: ['Suburban'],
    },
    {
        id: 'howrah_kharagpur',
        name: 'Howrah-Panskura-Kharagpur',
        stations: ['HWH', 'TPKR', 'DSNR', 'RMJ', 'SRC', 'MOM', 'ADL', 'SEL', 'ABB', 'NLR', 'BVS', 'CGA', 'FLR', 'ULB', 'BZN', 'DTE', 'KIG', 'MCA', 'PKU', 'BCK', 'KGP'],
        types: ['Suburban', 'MEMU'],
    },
    {
        id: 'kharagpur_midnapore',
        name: 'Kharagpur-Midnapore',
        stations: ['KGP', 'GMDN', 'GKL', 'MDN'],
        types: ['Suburban', 'MEMU'],
    },
    {
        id: 'howrah_amta',
        name: 'Howrah-Amta',
        stations: ['HWH', 'TPKR', 'DSNR', 'RMJ', 'SRC', 'BKNM', 'DMJ', 'BAC', 'AMZ'],
        types: ['Suburban'],
    },
    {
        id: 'sealdah_barasat',
        name: 'Sealdah-Barasat-Bangaon',
        stations: ['SDAH', 'DH', 'AGP', 'BT', 'HTAE', 'BNJ'],
        types: ['Suburban', 'Passenger'],
    },
    {
        id: 'sealdah_canning',
        name: 'Sealdah-Sonarpur-Canning',
        stations: ['SDAH', 'SPR', 'BRP', 'CG'],
        types: ['Suburban'],
    },
    {
        id: 'sealdah_dh',
        name: 'Sealdah-Diamond Harbour',
        stations: ['SDAH', 'SPR', 'BRP', 'LKPR', 'DHR'],
        types: ['Suburban'],
    },
    {
        id: 'sealdah_ranaghat',
        name: 'Sealdah-Ranaghat-Krishnanagar',
        stations: ['SDAH', 'DH', 'NSC', 'CHT', 'RNH', 'KNJ'],
        types: ['Suburban', 'MEMU'],
    },
    {
        id: 'barddhaman_asansol',
        name: 'Barddhaman-Asansol',
        stations: ['BWN', 'GAL', 'PAN', 'DGR', 'OYR', 'UDL', 'RNG', 'ASN'],
        types: ['MEMU', 'Express'],
    },
    {
        id: 'kharagpur_adra',
        name: 'Kharagpur-Bankura-Adra',
        stations: ['KGP', 'SLB', 'GBA', 'ODM', 'VSU', 'BQA', 'CJN', 'BBM', 'ANR', 'ADRA'],
        types: ['MEMU', 'Express'],
    },
    {
        id: 'adra_purulia',
        name: 'Adra-Purulia',
        stations: ['ADRA', 'PRR'],
        types: ['MEMU', 'Express'],
    },
    {
        id: 'howrah_njp',
        name: 'Howrah-NJP Express Route',
        stations: ['HWH', 'BWN', 'BHP', 'SNT', 'RPH', 'NHT', 'NFK', 'MLDT', 'DLK', 'KNE', 'NJP'],
        types: ['Express', 'Superfast', 'Intercity'],
    },
    {
        id: 'sealdah_njp',
        name: 'Sealdah-NJP Express Route',
        stations: ['SDAH', 'BWN', 'BHP', 'SNT', 'RPH', 'NHT', 'NFK', 'MLDT', 'DLK', 'KNE', 'NJP'],
        types: ['Express', 'Superfast'],
    },
    {
        id: 'hwh_malda',
        name: 'Howrah-Malda',
        stations: ['HWH', 'BWN', 'BHP', 'SNT', 'RPH', 'NHT', 'NFK', 'MLDT'],
        types: ['Express', 'Intercity'],
    },
    {
        id: 'njp_apdj',
        name: 'NJP-Alipurduar',
        stations: ['NJP', 'BNV', 'NMZ', 'BRQ', 'MDT', 'HSA', 'RVK', 'APDJ'],
        types: ['Passenger', 'Express'],
    },
    {
        id: 'njp_haldibari',
        name: 'NJP-Haldibari',
        stations: ['NJP', 'ABFC', 'FLK', 'DQG', 'HDB'],
        types: ['Passenger'],
    },
    {
        id: 'malda_balurghat',
        name: 'Malda-Balurghat',
        stations: ['MLDT', 'OMLF', 'EKI', 'GZO', 'BNDP', 'GRMP', 'BLGT'],
        types: ['Passenger', 'Express'],
    },
    {
        id: 'hwh_purulia',
        name: 'Howrah-Purulia Express',
        stations: ['HWH', 'BWN', 'DGR', 'ASN', 'ANR', 'ADRA', 'PRR'],
        types: ['Express', 'Superfast'],
    },
    {
        id: 'hwh_bankura',
        name: 'Howrah-Bankura',
        stations: ['HWH', 'SRC', 'KGP', 'VSU', 'BQA'],
        types: ['Express', 'MEMU'],
    },
    {
        id: 'howrah_digha',
        name: 'Howrah-Digha',
        stations: ['HWH', 'SRC', 'PKU', 'MDN', 'CNT', 'DIG'],
        types: ['Express', 'Superfast'],
    },
    {
        id: 'hwh_haldia',
        name: 'Howrah-Haldia',
        stations: ['HWH', 'SRC', 'PKU', 'TMK', 'HLZ'],
        types: ['Suburban', 'MEMU'],
    },
    {
        id: 'sdah_azimganj',
        name: 'Sealdah-Azimganj',
        stations: ['SDAH', 'BDC', 'KWAE', 'NDAE', 'AZ'],
        types: ['Express'],
    },
    {
        id: 'hwh_azimganj',
        name: 'Howrah-Azimganj',
        stations: ['HWH', 'BWN', 'BHP', 'SNT', 'AMP', 'AZ'],
        types: ['Express'],
    },
    {
        id: 'apdj_ncb',
        name: 'Alipurduar-Cooch Behar',
        stations: ['APDJ', 'APD', 'NCB', 'DHH', 'BXT'],
        types: ['Passenger'],
    },
    {
        id: 'sdah_krishnanagar',
        name: 'Sealdah-Krishnanagar',
        stations: ['SDAH', 'DH', 'NSC', 'RNH', 'BDZ', 'KNJ'],
        types: ['Express', 'MEMU'],
    },
    {
        id: 'hwh_jhargram',
        name: 'Howrah-Jhargram',
        stations: ['HWH', 'SRC', 'KGP', 'JGM'],
        types: ['Express', 'MEMU'],
    },
    {
        id: 'hwh_rampurhat',
        name: 'Howrah-Rampurhat',
        stations: ['HWH', 'BWN', 'BHP', 'PNE', 'SNT', 'TPAE', 'RPH'],
        types: ['Express', 'Intercity'],
    },
    {
        id: 'bandel_azimganj',
        name: 'Bandel-Azimganj',
        stations: ['BDC', 'KWAE', 'NDAE', 'AZ', 'BHW'],
        types: ['Passenger', 'Express'],
    },
    {
        id: 'nfk_azimganj',
        name: 'NFK-Azimganj',
        stations: ['NFK', 'AZ', 'ACLE', 'JRP'],
        types: ['Passenger'],
    },
    {
        id: 'bankura_masagram',
        name: 'Bankura-Masagram',
        stations: ['BQA', 'VSU', 'ODM', 'MSG', 'MSAE'],
        types: ['MEMU'],
    },
];

// Get station by code
export function getStation(code) {
    return stations.find(s => s.code === code);
}

// Get stations by district
export function getStationsByDistrict(district) {
    return stations.filter(s => s.district === district);
}

// Get all unique district names from stations
export function getAllDistricts() {
    return [...new Set(stations.map(s => s.district))].sort();
}
