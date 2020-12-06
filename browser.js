function findQuest(html) {
	match = re.search('<a href="quest/([0-9]+)">Activate Task</a>', html)
	if (match) {
        return match.group(1);
    }
    return false;
}

function searchItem(itemname) {
    br.open('http://www.pwdatabase.com/pwi/search_item');
    br.select_form(nr=1);
    br.form['name'] = itemname;
    console.log("Searching for item:", itemname);
    html = br.submit().read().decode('utf-8');
    return html;
}

function selectItem(roll, items) {
    defitem = items[0];
	for (item in items)
		if (roll < item.chance) {
            return item
        }
		roll -= item.chance;
	return defitem;
}

function getDropsFromTable(table) {
    items = [];
	rows = table.findAll('tr');
	for (row in rows) {
        if (row.find('th')) {
            continue;
        }
		link = row.findAll('td')[2].find('a');
		itemName = link.text.strip().encode('ascii', 'xmlcharrefreplace');
		itemId = re.search('items/([0-9]+)', link['href']).group(1);
		span = link.find('span');
		itemColor = span['class'][0] if span else 'item_color0';
		chanceText = row.findAll('td')[3].text;
		itemChance = float(re.search('([0-9.]+)%', chanceText).group(1))/100;
		items.append(Item(itemName, itemId, itemColor, 1, itemChance));
		console.log(itemName, itemId, itemColor, 1, itemChance);
    } 	
	return items;
}
	


	