export const navigation = [
  {
    text: '',
    items:[
      {
        text: 'Bàn làm việc',
        path: '/tasks',
        icon:'fa fa-tachometer-alt'
      }
    ]
  },
  {
    text: 'Quy trình',
    items:[
      {
        text: 'Phiếu yêu cầu công việc',
        path: '/profile',
        icon:'fa fa-clipboard-list'
      },
      {
        text: 'Phiếu kết quả công việc',
        path: '/profile',
        icon:'fa fa-check-double'
      }
    ]
  },
  {
    text: 'Danh mục',
    items:[
      {
        text: 'Đơn vị tính',
        path: '/pages/categogy/unit',
        icon:'fa fa-solar-system'
      },
      {
        text: 'Nhóm Thiết bị',
        path: '/pages/categogy/device-group',
        icon:'fa fa-layer-group'
      },
      {
        text: 'Thiết bị',
        path: '/pages/categogy/device',
        icon:'fa fa-microchip'
      },
      {
        text: 'Cơ sở/ Nhà cung cấp',
        path: '/pages/categogy/customer',
        icon:'fa fa-house-user'
      }
    ]
  },
  {
    text:'Báo cáo',
    items:[
      {
        text: 'Báo cáo xuất nhập tồn',
        path: '/tasks',
        icon:'fa fa-boxes'
      },
      {
        text: 'Báo cáo tồn kho',
        path: '/tasks',
        icon:'fa fa-warehouse'
      },
      {
        text: 'Báo cáo doanh thu chi phí',
        path: '/tasks',
        icon:'fa fa-dolly-flatbed'
      },
      {
        text: 'Báo cáo công việc',
        path: '/tasks',
        icon:'fa fa-briefcase'
      }
    ]
  },
  {
    text: 'Hệ thống',
    items:[
      {
        text: 'Quản trị',
        icon:'fa fa-users-cog',
        items: [
          {
            text:'Danh sách tài khoản',
            path: '/pages/manager/users',
            icon:'fa fa-chevron-right'
          },
          {
            text:'Danh sách nhóm quyền',
            path: '/pages/manager/roles',
            icon:'fa fa-chevron-right'
          },
          {
            text:'Phân quyền',
            path: '/pages/manager/permission',
            icon:'fa fa-chevron-right'
          }
        ]
      },
      {
        text: 'Cài đặt tham số',
        path: '/pages/manager/option-parameters',
        icon:'fa fa-newspaper',
      },
    ]
  },
  {
    text: 'Cài đặt',
    items:[
      {
        text: 'Website',
        path: '/profile',
        icon:'fa fa-cog'
      },
      {
        text: 'Cấu hình',
        path: '/profile',
        icon:'fa fa-puzzle-piece'
      }
    ]
  }
];
