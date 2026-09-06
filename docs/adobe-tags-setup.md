# Adobe Tags Setup

The repository cannot create Adobe-side resources. Manually:

1. Create a web Tags property.
2. Install the Adobe Experience Platform Web SDK extension.
3. Configure it with the approved datastream and organization.
4. Create data elements for the data layer fields.
5. Create XDM object data elements using the target schema and custom field group.
6. Create page-view rules.
7. Create product interaction rules.
8. Create cart rules.
9. Create checkout rules.
10. Create one purchase rule from the confirmation event.
11. Ensure the purchase rule sends once per unique purchase ID.
12. Build a development library and publish to a development environment.
13. Validate with Adobe Experience Platform Debugger and Adobe Assurance.

Do not copy the placeholder tenant path into production without matching it to the schema. Do not add organization IDs, datastream IDs, or API credentials to this repository.
