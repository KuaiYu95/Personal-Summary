import React, { useState, useEffect } from 'react'
import { List, Avatar, Icon, Tag, BackTop, Menu } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios';
import './index.less'

const { Item } = Menu

interface IconType {
	type: string,
	text: string,
}

function PostList() {
	const [selectedKeys, setSelectedKeys] = useState(['0'])
	const [data, setData] = useState([])
	useEffect(() => {
		axios.get(`/postsList:keys=${selectedKeys}`)
			.then(res => {
				console.log(res.data)
				setData(res.data)
			})
	}, [data.length])
	
	const listData = [];
	for (let i = 0; i < 23; i++) {
		listData.push({
			href: 'http://ant.design',
			title: `ant design part ${i}`,
			avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			description:
				'Ant Design, a design language for background applications, is refined by Ant UED Team.',
			content:
				'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
		});
	}

	const IconText = ({ type, text }:IconType) => (
		<span>
			<Icon type={type} style={{ marginRight: 8 }} />
			{text}
		</span>
	);

	function tag(type:string[]):any {
		const arr = type.map((it:string) => {
			switch(it) {
				case '前端':
					return <Tag key='green' color="green">{it}</Tag>
				case '工具':
					return <Tag key='cyan' color="cyan">{it}</Tag>
				case '后端':
					return <Tag key='blue' color="blue">{it}</Tag>
				case '数据库':
					return <Tag key='geekblue' color="geekblue">{it}</Tag>
				case '日志':
					return <Tag key='purple' color="purple">{it}</Tag>
				case '刷题':
					return <Tag key='magenta' color="magenta">{it}</Tag>
				default: 
					return null
			}
		})
		return arr
	}

	function handleSelect(selectedKeys:string[]) {
		setSelectedKeys(selectedKeys)
		console.log(selectedKeys)
		axios.get(`/postsList:keys=${selectedKeys}`)
			.then(res => {
				setData(res.data)
			})
	}
	
	const img = require('../../images/logos/logo800.png')
	return (
		<div className="mainContent">
			<BackTop />
			<div className="blogList">
				<List
					itemLayout="vertical"
					size="large"
					bordered
					pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 10,
					}}
					dataSource={data}
					footer={
						<div>
							<div>欢迎来到蒯煜的个人博客</div>
							<br/>
							<div><Icon type="github" /> <a href="https://github.com/KuaiYu95" rel="noopener noreferrer" 
								target="_blank" >https://github.com/KuaiYu95</a></div>
							<br/>
							<div><Icon type="wechat" /> mywx_ky</div>
						</div>
					}
					renderItem={(item:any) => (
						<List.Item
							key={item.title}
							actions={[
								<IconText type="like" text={item.likeCount} />,
								<IconText type="message" text={item.commentCount} />,
								<IconText type="eye" text={item.viewCount} />,
								<IconText type="clock-circle" text={moment(+item.date).fromNow()} />,
							]}
							extra={
								item.url ? <img style={{maxHeight:150, maxWidth:200}} alt="logo" src={item.url} /> : null
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={img} />}
								title={<Link to={"/postView/:id=" + item._id}>{item.title}</Link>}
								description={tag(item.type)}
							/>
							{item.content.substring(0,100).replace(/[#+\-`*]/g,"")}
						</List.Item>
					)}
				/>
			</div>
			<div className="typeList">
				<Menu selectedKeys={selectedKeys} onSelect={({selectedKeys}) => handleSelect(selectedKeys)} mode='vertical' className="menu">
					<Item style={{width: '100%'}} key={'0'}><Icon type="appstore" /> 全部 ({data.length})</Item>
					<Item style={{width: '100%'}} key={'1'}><Icon type="html5" /> 前端 </Item>
					<Item style={{width: '100%'}} key={'2'}><Icon type="database" /> 后端 </Item>
					<Item style={{width: '100%'}} key={'3'}><Icon type="cloud-server" /> 数据库 </Item>
					<Item style={{width: '100%'}} key={'4'}><Icon type="tool" /> 工具 </Item>
					<Item style={{width: '100%'}} key={'5'}><Icon type="edit" /> 刷题 </Item>
					<Item style={{width: '100%'}} key={'6'}><Icon type="file-markdown" /> 日志 </Item>
				</Menu>
			</div>
		</div>
	)
}

export default PostList