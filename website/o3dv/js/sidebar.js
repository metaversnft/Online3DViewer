OV.Sidebar = class
{
    constructor (mainDiv)
    {
        this.mainDiv = mainDiv;
        this.panelSet = new OV.PanelSet (mainDiv);

        this.detailsPanel = new OV.DetailsSidebarPanel (this.panelSet.GetContentDiv ());
        this.settingsPanel = new OV.SettingsSidebarPanel (this.panelSet.GetContentDiv ());

        this.panelSet.AddPanel (this.detailsPanel);
        this.panelSet.AddPanel (this.settingsPanel);
        this.panelSet.ShowPanel (this.detailsPanel);
    }

    Init (settings, callbacks)
    {
        this.callbacks = callbacks;

        this.panelSet.Init ({
            onResize : () => {
                if (this.panelSet.IsPanelsVisible ()) {
                    //this.splitterDiv.show ();
                } else {
                    //this.splitterDiv.hide ();
                }
                this.callbacks.onResize ();
            }
        });

        let defaultSettings = new OV.Settings ();
        this.settingsPanel.InitSettings (
            settings,
            defaultSettings,
            {
                onBackgroundColorChange : (newVal) => {
                    this.callbacks.onBackgroundColorChange (newVal);
                },
                onDefaultColorChange : (newVal) => {
                    this.callbacks.onDefaultColorChange (newVal);
                },
                onThemeChange : (newVal) => {
                    this.callbacks.onThemeChange (newVal);
                }
            }
        );
    }

    Update (model)
    {
        this.settingsPanel.Update (model);
    }

    Resize (height)
    {
        this.mainDiv.outerHeight (height, true);
        //this.splitterDiv.outerHeight (height, true);
        this.panelSet.Resize ();
    }

    GetWidth ()
    {
        let sidebarWidth = parseInt (this.mainDiv.outerWidth (true), 10);
        // let splitterWidth = 0;
        // if (this.panelSet.IsPanelsVisible ()) {
        //     splitterWidth = parseInt (this.splitterDiv.outerWidth (true), 10);
        // }
        //return sidebarWidth + splitterWidth;
        return sidebarWidth;
    }

    Clear ()
    {
        this.panelSet.Clear ();
    }

    AddObject3DProperties (object3D)
    {
        this.detailsPanel.AddObject3DProperties (object3D);
    }

    AddMaterialProperties (material)
    {
        this.detailsPanel.AddMaterialProperties (material);
    }
};
