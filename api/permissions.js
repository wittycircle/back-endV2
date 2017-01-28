/**
 * Created by rdantzer on 28/01/17.
 */

'use strict';

/**
 * @apiDefine logged Authenticated users only
 * User needs to own a valid Bearer token in order to access this endpoint
 */

/**
 * @apiDefine owner Resource owner only
 * User needs to own the resource in order to access it (eg: cant modify someone else skills)
 */

/**
 * @apiDefine admin Site admins only
 * User needs to be authenticated and have the admin rank in order to access this endpoint
 */

/**
 * @apiDefine dev Developers only
 * User needs to be a developer in order to access this endpoint
 */