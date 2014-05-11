function atmcClearText()
{        
    if(atmcDescription != null && atmcCollectionName != null && atmcRdoExistingCollection != null)
    {
        atmcDescription.value = '';        
        atmcCollectionName.value = '';
        atmcRdoExistingCollection.checked = atmcRdoExistingCollectionChecked;
    }
    if (atmcCustomValidator != null) {
        atmcCustomValidator.style.display = 'none';
    }
    atmcSelectionChanged();
}

function atmcValidate()
{
    if(atmcRdoNewCollection.checked)
    {
        var regExp = /^\s{1,}$/g; //match any white space including space, tab, form-feed, etc.
        if ((atmcCollectionName.value == null) || (atmcCollectionName.value.length == 0) || ((atmcCollectionName.value.search(regExp)) > -1)) 
        {
            alert('Please enter Folder name.');
            atmcCollectionName.focus();
            atmcCollectionName.select();
            return false;
        }
    }
    
    var hiddenAddArticle = getAddToMyCollectionHidden();
    hiddenAddArticle.value = 'true';
    return true;
}

function atmcClose()
{
    if(atmcGetPopup() != null)
    {
        atmcGetPopup().hide();
    }
    atmcClearText();
    atmcShowMainPanel();        
}

function atmcShowMainPanel()
{
    atmcPnlMain.style.display = 'block';
    atmcPnlMessage.style.display = 'none';   
}

function atmcSelectionChanged()
{        
    if(atmcRdoExistingCollection.checked)
    {   
        atmcParaCollectionName.className="ej-disabled-style";
        atmcParaCollectionDescription.className="ej-disabled-style";   
        atmcCollectionName.disabled = true;
        atmcDescription.disabled = true;
        atmcCmbExistingCollection.disabled = false;
    }
    else
    {
        atmcCollectionName.disabled = false;
        atmcDescription.disabled = false;
        atmcParaCollectionName.className="";
        atmcParaCollectionDescription.className="";
        atmcCmbExistingCollection.disabled = true;
    }
    return true;        
}
function atmcSetFocus()
{
    if(atmcRdoNewCollection.checked)
    {
        atmcCollectionName.focus();
    }
}
