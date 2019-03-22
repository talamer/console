import * as React from 'react';
import { CatalogTile } from 'patternfly-react-extensions';

export const ImportFlowCatalog: React.SFC<any> = props => {
  return (
    <div className="catalog-tile-view-pf catalog-tile-view-pf-no-categories import__catalog">
      <div className="import__filter">
       <input
        className="form-control"
        type="text"
        id="name"
        value="Filter by name"
      />
    </div>
      {
      props.sourceImages.map((image, idx) => {
        return (
        <CatalogTile
          key={idx}
          title={image.title}
          className="image__item"
          iconImg={image.img}
          description={image.description} />
        )
      })
      }
  </div>
  );
}

