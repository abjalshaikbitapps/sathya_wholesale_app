import pandas as pd

from playwright.sync_api import sync_playwright

from urllib.parse import urlparse

from pathlib import Path




with sync_playwright() as p:

    browser = p.chromium.launch(headless=True)

    context = browser.new_context()

    context.clear_cookies()

    context.clear_permissions()

    page = context.new_page()

    page.goto('https://capitalcsc.com/')

    page.fill('input[name="TxtReturningEmail"]', 'Ameristop@gmail.com')

    page.fill('input[name="TxtReturningPassword"]', 'Change29')

    button = page.wait_for_selector('input[name="BtnLogin"]', timeout=600000)  # Increased timeout to 60 seconds (60000 milliseconds)

    button.click()

    page.wait_for_url('https://capitalcsc.com/Default.aspx', timeout=60000)

    # page.goto('https://capitalcsc.com/ItemSearch.aspx?WebCatID=Tobacco')

    # page.wait_for_url('https://capitalcsc.com/ItemSearch.aspx?WebCatID=Tobacco')




    sidebar_links = page.query_selector_all('#Menu .accordionContent a')

    categories=['Automotive','Tobacco','Candy','CellphoneAccessories','BabyProducts','FoodGrocery']




    # print(f"Product Name: {sidebar_links}")

    hrefs = [{'hrefval':link.get_attribute('href'),'text':link.text_content() } for link in sidebar_links]

    # print(f"Product Name: {hrefs}")

    data=[]

    i=0

    items=['ItemSearch.aspx?WebCatID=PARCELSHIPMENTITEMS']




    for href in hrefs:

       catname = href['hrefval'].split('=')[-1]

       for cat in categories:

        print(cat)

        if cat not in href['hrefval']:

            print(cat,"skipped")

            continue

       

       

        print(href['hrefval'],"else")

        base_url = 'https://capitalcsc.com/'+ href['hrefval']




        page.goto(base_url)




        page.wait_for_load_state('load')

        while True:

         product_details = page.query_selector_all('table td.Item')

         table_data=[]

         for td in product_details:

           div_handle = td.query_selector('div')

           background_image = div_handle.evaluate('(element) => window.getComputedStyle(element).getPropertyValue("background-image")')

           background_image_url = background_image.replace('url("', '').replace('")', '')

           p=Path(background_image_url)

           mainfilename=p.name

           newfilename=p.name.replace('thn','')

           directory=p.parent

           new_path = directory / newfilename

           

           # Convert the new path to a string

           new_path_str = str(new_path)

          #  print(new_path_str)

           #for product subdetails

           innlinevalues=[]

           linevalues = td.query_selector_all('.TextSmallDark')

           textcontext=td.query_selector('.TextMediumBlue')

           maindict={}

           for line in linevalues:

           

            stringform=line.text_content()

            splitval=stringform.split(':')

           

            maindict[splitval[0]]=splitval[1]

           




           

          #  textcontext=td.text_content()

         

           maindict['name']=textcontext.text_content()

           maindict['image']={'original':new_path_str,'thumbnail':new_path_str}

           maindict['Subcategory']=href['text']

           maindict['category']=cat

           

           print(maindict)

           table_data.append(maindict)

        #    print(background_image_url)

           

        #    print(td.text_content())

   

         next_button = page.query_selector('a#MainContent_lnkbNext')

         if next_button is None:

           break




         next_button.click()

         page.wait_for_load_state('networkidle')

         data.extend(table_data)







       

        # Extract product details from the current page

        # product_name = page.query_selector('.divImage')

        # print(f"urlproductname: {product_name}")

        # if(product_name==None):

        #    continue

        # background_image = product_name.evaluate('(element) => window.getComputedStyle(element).getPropertyValue("background-image")')




        # # Clean up the background image URL value

        # background_image_url = background_image.strip('url(")').strip('")')

        # # backgroundimage=product_name.get_property('style')['background-image']

        # # background_image_url = backgroundimage.replace('url("', '').replace('")', '')

        # price = page.query_selector('.TextMediumBlue').inner_text()

        # # Extract any other desired product details using appropriate selectors




        # # Process or store the extracted product details as per your requirements

        # print(f"Product Name: {background_image_url}")

        # print(f"Price: {price}")




        # # Go back to the previous p age to click on the next sidebar link

        # page.goto('https://capitalcsc.com/Default.aspx')

    df = pd.DataFrame(data)
    routepath='/home/bitapps/new/sathya_wholesale_app/api/public/python'

    filename = 'product_details.xlsx'
    file_path = f'{routepath}/{filename}'


    df.to_excel(file_path, index=False)





    print("closed")

 

context.close()

browser.close()