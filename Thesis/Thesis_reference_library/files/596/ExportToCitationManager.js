function validateExportType()
{
    hiddenExportType.value = 'true';
    closeExportToModalPopUp();
    return true;
}

function closeExportToModalPopUp()
{
    if(getExportPopup() != null)
    {
        getExportPopup().hide();
    }
    showMainExportPanel();
    return false;  
}

function showMainExportPanel()
{
    pnlMainExport.style.display = 'block';
}