import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IJobTitle } from '../models/JobTitle'
import { JobTitle } from '../utils/models'

@Controller('/jobtitles')
	@Get('/')
			return res.status(200).json(await JobTitle.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')
			return res.status(200).json(await JobTitle.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')
			return res.status(201).json((await JobTitle.upsert(jobtitle))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')
			return res.status(202).send(await JobTitle.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}