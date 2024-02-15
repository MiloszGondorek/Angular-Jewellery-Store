import type { Schema, Attribute } from '@strapi/strapi';

export interface ReusableSize extends Schema.Component {
  collectionName: 'components_reusable_sizes';
  info: {
    displayName: 'Size';
  };
  attributes: {
    Size: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isAvaible: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'reusable.size': ReusableSize;
    }
  }
}
